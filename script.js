const dataFilePath = "bikes.json";

const loadProducts = async () => {
    try {
        const response = await fetch(dataFilePath);
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
}
const displayProducts = (products) => {
    const container = document.querySelector('#products-container');

    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");

        const img = document.createElement("img");
        img.src = product.img;
        img.alt = product.title;
        productCard.appendChild(img);

        const title = document.createElement("h2");
        title.textContent = product.title;
        productCard.appendChild(title);

        const price = document.createElement("p");
        price.classList.add("price");
        price.textContent = product.price || "Precio no disponible";
        productCard.appendChild(price);

        container.appendChild(productCard);
    });
}

loadProducts();
