const puppeteer = require("puppeteer");
const { write } = require("./fileHandler");

const scrapper = async (url) => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--disable-gpu", "--disable-dev-shm-usage"],
    defaultViewport: { width: 1920, height: 1080 },
    slowMo: 10,
  });
  console.log("Abriendo navegador: " + url);
  const page = await browser.newPage();
  await page.goto(url);

  const cookieButton = await page.$("#CybotCookiebotDialogBodyLevelButtonAccept");
  if (cookieButton) {
    await cookieButton.click();
  }
  await repeat(page, browser);
};

const bikesArray = [];
const seenTitles = new Set();

const repeat = async (page, browser) => {

  const previousCount = bikesArray.length;
  const bikesDivs = await page.$$(".product_list_item");

  console.log("Recogiendo datos...");
  for (const bikesDiv of bikesDivs) {
    const title = await bikesDiv.$eval(".s_title_block > a", el => el.textContent.trim()).catch(() => null);
    await bikesDiv.scrollIntoView();

    if (title && seenTitles.has(title)) {
      continue;
    }

    const price = await bikesDiv.$eval(".price.st_discounted_price", el => el.textContent.trim()).catch(() => null);
    await page.waitForSelector(".tm_gallery_item.swiper-lazy-loaded", { timeout: 5000 });
    const img = await bikesDiv.$eval(".tm_gallery_item.swiper-lazy-loaded", el => {
      return el.getAttribute("data-src") || el.getAttribute("src") || null;
    }).catch(async () => {
      return await bikesDiv.$eval(".tm_gallery_item.swiper-lazy-loaded", el =>
        el.getAttribute("data-src") || el.getAttribute("src") || null
      ).catch(() => null);
    });
    const bike = {
      title,
      price,
      img
    };

    if (title) {
      bikesArray.push(bike);
      seenTitles.add(title);
    }
  }
  console.log(`Recogidas ${bikesArray.length} bicicletas hasta ahora.`);

  try {
    const isLoadMoreAvailable = await page.evaluate(() => {
      const loadMoreLink = document.querySelector(".infinite-more-link.btn");
      if (loadMoreLink) {
        loadMoreLink.click();
        return true;
      }
      return false;
    });

    if (isLoadMoreAvailable) {
      await page.waitForSelector(".product_list_item", { timeout: 5000 });
      await page.evaluate(() => window.scrollBy(0, window.innerHeight));
      await page.evaluate(() => new Promise(resolve => setTimeout(resolve, 2000)));

      if (bikesArray.length > previousCount) {
        console.log("Cargando más...");
        await repeat(page, browser);
      } else {
        console.log("No se encontraron nuevos productos después de 'Cargar más', finalizando...");
        write(bikesArray);
        await browser.close();
      }
    } else {
      console.log("No se encontró el enlace 'Cargar más', finalizando...");
      write(bikesArray);
      await browser.close();
    }
  } catch (error) {
    console.error("Error al cargar más datos:", error);
    write(bikesArray);
    await browser.close();
  }
};


module.exports = { scrapper };
