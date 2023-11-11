import express from "express";
import { ProductManager } from "./ProductManager.js";

const app = express();

app.use(express.json());

const pm = new ProductManager("./db/products.json");
app.get("/products", async (req, res) => {
  let limit = req.query.limit;
  const data = await pm.getProducts();
  if (!limit) {
    return res.json(data);
  }
  let limitedProducts = data.slice(0, limit);
  return res.json(limitedProducts);
});

app.get("/products/:id", async (req, res) => {
  const id = Number(req.params.id);
  try {
    const productForId = await pm.getProductById(id);
    return res.json(productForId);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
});

app.listen(8080, () =>
  console.log("Ingresa al siguiente link: http://localhost:8080/products")
);
