const form = document.querySelector("form");
const productContainer = document.querySelector(".product-container");

const socket = io();
getProducts();

form?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const title = document.querySelector("#title").value;
  const description = document.querySelector("#description").value;
  const code = document.querySelector("#code").value;
  const price = document.querySelector("#price").value;
  const stock = document.querySelector("#stock").value;
  const category = document.querySelector("#category").value;
  const thumbnails = document.querySelector("#thumbnails").value;
  // Validar
  if (
    !title ||
    !description ||
    !code ||
    !price ||
    !stock ||
    !category ||
    !thumbnails
  ) {
    Swal.fire({
      title: "Error!",
      text: "Todos los campos son obligatorios",
      icon: "error",
      confirmButtonText: "Ok",
    });
    return;
  }

  socket.emit("addProduct", {
    title,
    description,
    code,
    price,
    stock,
    category,
    thumbnails,
  });
  form.reset();
});

socket.on("getProducts", async () => {
  productContainer.innerHTML = "";

  const response = await fetch("/api/products");
  const products = await response.json();

  if (products[0]) {
    products.forEach((product) => {
      let card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <div class="card-body">
          <h5 class="card-title">${product.title}</h5>
          <h6 class="card-subtitle mb-2 text-body-secondary">Descripcion: ${product.description}</h6>
          <p class="card-text">Stock disponible: ${product.stock}</p>
        </div>
      `;

      let deleteButton = document.createElement("button");
      deleteButton.textContent = "Eliminar producto";
      deleteButton.classList.add("btn", "btn-danger");

      deleteButton.addEventListener("click", () => {
        const productID = product.id;

        Swal.fire({
          title: "¿Estás seguro?",
          text: "¡No podrás revertir esto!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#d33",
          cancelButtonColor: "#3085d6",
          confirmButtonText: "Sí, eliminarlo",
          cancelButtonText: "Cancelar",
        }).then(async (result) => {
          if (result.isConfirmed) {
            // Si el usuario confirma
            socket.emit("deleteProduct", productID);

            // Mostrar mensaje
            Swal.fire({
              title: "Producto Eliminado",
              text: "El producto se ha eliminado exitosamente",
              icon: "success",
              confirmButtonText: "Ok",
            });
          }
        });
      });

      card.appendChild(deleteButton);
      productContainer.appendChild(card);
    });
  } else {
    productContainer.innerHTML = `<div>No hay ningun producto disponible</div>`;
  }
});
