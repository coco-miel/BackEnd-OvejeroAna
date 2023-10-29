// Realizar una clase “ProductManager” que gestione un conjunto de productos.
class ProductManager {
  static id = 0;
  constructor() {
    this.products = []; // constructor con el elemento products, el cual será un arreglo vacío
  }
  // Método “addProduct” el cual agregará un producto al arreglo de productos inicial
  addProduct(title, description, price, thumbnail, code, stock) {
    // Validar que no se repita el campo “code” y que todos los campos sean obligatorios
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
    if (this.products.some((product) => product.code === code)) {
      console.log("El código ya existe para otro producto.");
      return;
    }
    // Al agregarlo, debe crearse con un id autoincrementable
    ProductManager.id++;
    this.products.push({
      id: title,
      description,
      price,
      thumbnail,
      code,
      stock,
      id: ProductManager.id,
    });
  }

  // Método “getProducts” el cual debe devolver el arreglo con todos los productos creados hasta ese momento
  getProducts() {
    return this.products;
  }

  // Método “getProductById” el cual debe buscar en el arreglo el producto que coincida con el id
  getProductById(id) {
    // En caso de no coincidir ningún id, mostrar en consola un error “Not found”
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      return "Not found";
    }
    return product;
  }
}

const product = new ProductManager();

product.addProduct("producto1", "Descripción", 123, "imagen1.jpg", "P123", 100);
product.addProduct("producto2", "Descripción", 345, "imagen3.jpg", "P124", 1);

console.log(product.getProducts()); // Retorna todo
console.log(product.getProductById(2)); // Encuentra el producto con ID 2
console.log(product.getProductById(3)); // Not Found

console.log("------------------------------------");

product.addProduct("producto3", "Descripción", 567, "imagen3.jpg", "P124", 1); // codigo ya existe
product.addProduct("producto4", "Descripción", 789); // faltan campos
