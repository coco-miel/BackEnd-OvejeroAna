import fs from "fs/promises";

class Product {
  constructor({ title, description, price, thumbnail, code, stock }) {
    if (
      !title ||
      !description ||
      !price ||
      !thumbnail ||
      !code ||
      stock === undefined
    ) {
      throw new Error("Todos los campos son obligatorios.");
    }

    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
  }
}

class ProductManager {
  #idCounter = 0;
  constructor(filePath) {
    this.path = filePath;
    this.products = [];
  }

  async addProduct(productData) {
    try {
      const product = new Product(productData);

      if (this.products.some((p) => p.code === product.code)) {
        throw new Error("El código ya existe para otro producto.");
      }

      this.#idCounter++; 
      product.id = this.#idCounter;
      this.products.push(product);
      await this.saveProductsToFile();
      return product;
    } catch (error) {
      console.error("Error al agregar producto:", error);
      return null;
    }
  }

  async getProducts() {
    await this.loadProductsFromFile();
    return this.products;
  }

  async getProductById(id) {
    await this.loadProductsFromFile();
    const product = this.products.find((p) => p.id === id);
    return product || "Not found";
  }

  async updateProduct(id, updatedData) {
    await this.loadProductsFromFile();
    const productIndex = this.products.findIndex((p) => p.id === id);
    if (productIndex !== -1) {
      this.products[productIndex] = {
        ...this.products[productIndex],
        ...updatedData,
      };
      await this.saveProductsToFile();
      return this.products[productIndex];
    }
    return null;
  }

  async deleteProduct(id) {
    await this.loadProductsFromFile();
    const productIndex = this.products.findIndex((p) => p.id === id);
    if (productIndex !== -1) {
      this.products.splice(productIndex, 1);
      await this.saveProductsToFile();
      return true;
    }
    return false;
  }

  async loadProductsFromFile() {
    try {
      const data = await fs.readFile(this.path, "utf8");
      this.products = JSON.parse(data);
    } catch (error) {
      console.error("Error al cargar productos desde el archivo:", error);
      this.products = [];
    }
  }

  async saveProductsToFile() {
    try {
      await fs.writeFile(
        this.path,
        JSON.stringify(this.products, null, 2),
        "utf8"
      );
    } catch (error) {
      console.error("Error al guardar productos en el archivo:", error);
    }
  }
}

//comprobando
const pm = new ProductManager("productos.json");
const productos = await pm.getProducts();

console.log("Todos los productos:", productos);

await pm.addProduct({
  title: "Producto",
  description: "descripcion",
  price: 200,
  thumbnail: "imagen1.jpg",
  code: "ABC123",
  stock: 25,
});

const productoBuscado = await pm.getProductById(1);
console.log("Producto buscado:", productoBuscado);

const productToUpdate = await pm.updateProduct(1, {
  title: "Producto Nuevo",
  description: "descripcion nueva",
});

console.log("Producto actualizado:", productToUpdate);

const productoEliminado = await pm.deleteProduct(1);
console.log("Producto eliminado:", productoEliminado);