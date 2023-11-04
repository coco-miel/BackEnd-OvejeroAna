class Product {
  constructor({ title, description, price, thumbnail, code, stock }) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
  }
}

class ProductManager {
  #idCounter = 0; // Atributo privado para el contador de ID
  products = [];

  addProduct({ title, description, price, thumbnail, code, stock }) {
    if (
      !title ||
      !description ||
      !price ||
      !thumbnail ||
      !code ||
      stock === undefined
    ) {
      console.log("Todos los campos son obligatorios.");
      return;
    }

    if (
      this.products.some((existingProduct) => existingProduct.code === code)
    ) {
      console.log("El código ya existe para otro producto.");
      return;
    }

    this.#idCounter++; // Incrementar el contador de ID
    const product = new Product({
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    });
    product.id = this.#idCounter; // Asignar el ID al producto
    this.products.push(product);
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find(
      (existingProduct) => existingProduct.id === id
    );
    return product || "Not found";
  }
}

const productManager = new ProductManager();

productManager.addProduct({
  title: "producto1",
  description: "Descripción",
  price: 123,
  thumbnail: "imagen1.jpg",
  code: "P123",
  stock: 100,
});

productManager.addProduct({
  title: "producto2",
  description: "Descripción",
  price: 345,
  thumbnail: "imagen3.jpg",
  code: "P124",
  stock: 1,
});

console.log("Todos los productos: ");
console.log(productManager.getProducts());

console.log("Producto específico: ");
console.log(productManager.getProductById(1)); // Encuentra el producto con ID 1
console.log(productManager.getProductById(3)); // Not Found
