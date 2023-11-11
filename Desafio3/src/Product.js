export class Product {
  constructor({ title, description, price, thumbnail, code, stock }) {
    if (
      !title ||
      !description ||
      price < 0 ||
      !thumbnail ||
      !code ||
      stock === undefined
    ) {
      throw new Error(
        "Todos los campos son obligatorios y el precio no puede ser negativo."
      );
    }

    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
  }
}
