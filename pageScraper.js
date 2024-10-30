const puppeteer = require("puppeteer");
const { write } = require("./fileHandler");

const scrapper = async (url) => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ["--disable-gpu", "--disable-dev-shm-usage"],
    defaultViewport: { width: 1920, height: 1080 },
    slowMo: 10,
  });
  const page = await browser.newPage();
  await page.goto(url);
  console.log("Launched");


  const cookieButton = await page.$("#CybotCookiebotDialogBodyLevelButtonAccept");
  if (cookieButton) {
    await cookieButton.click();
  }
  await repeat(page, browser);
};

const bikesArray = [];

const repeat = async (page, browser) => {
  const bikesDivs = await page.$$(".products.product_list.row.grid.clear_list_16.clear_list_align_0.clear_list_proportion_0 > .product_list_item");

  console.log("Recogiendo datos...");
  for (const bikesDiv of bikesDivs) {
    const price = await bikesDiv.$eval(".price.st_discounted_price", el => el.textContent.trim()).catch(() => null);
    const title = await bikesDiv.$eval(".s_title_block > a", el => el.textContent.trim()).catch(() => null);
    const img = await bikesDiv.$eval(".tm_gallery_item.swiper-lazy-loaded", el => el.src).catch(() => null);

    const bike = { title, price, img };
    if (title) {
      bikesArray.push(bike);
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
      await page.waitForSelector(".products.product_list", { timeout: 5000 });
      console.log("Cargando más...");
      await repeat(page, browser);
    } else {
      console.log("No se encontró el enlace 'Cargar más', finalizando...");
      write(bikesArray); // Ahora `bikesArray` contiene todas las bicicletas
      await browser.close();
    }
  } catch (error) {
    console.error("Error al cargar más datos:", error);
    write(bikesArray);
    await browser.close();
  }
};

module.exports = { scrapper };
