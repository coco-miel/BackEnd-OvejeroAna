import { Router } from "express";

export const webRouter = Router();

webRouter.get("/", (req, res) => {
  res.render("home.handlebars", { title: "Home" });
});
webRouter.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts.handlebars", {
    title: "Productos Actualizados",
  });
});
