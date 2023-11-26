async function getProducts() {
  const productContainer = document.querySelector(".product-list");
  const response = await fetch("/api/products");
  const products = await response.json();

  productContainer.innerHTML = "";

  if (products[0]) {
    products.map((product) => {
      let card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <div class="card-body">
          <h5 class="card-title">${product.title}</h5>
          <h6 class="card-subtitle mb-2 text-body-secondary">Descripcion: ${product.description}</h6>
          <p class="card-text">Stock disponible: ${product.stock}</p>
        </div>
      `;

      productContainer.appendChild(card);
    });
  } else {
    productContainer.innerHTML = `
      <div>No hay ningun producto disponible</div>`;
  }
}

getProducts();
