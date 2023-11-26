import { Server } from "socket.io";
import { productManager } from "../services/ProductManager.js";

export function initializeSocketServer(httpServer) {
  const websocketServer = new Server(httpServer);

  websocketServer.on("connection", async (socket) => {
    console.log(socket.id);

    socket.emit("getProducts", await productManager.getProducts());

    socket.on(
      "addProduct",
      async ({
        title,
        description,
        code,
        price,
        stock,
        category,
        thumbnails,
      }) => {
        await productManager.addProduct({
          title,
          description,
          code,
          price,
          stock,
          category,
          thumbnails,
        });
        websocketServer.emit("getProducts", await productManager.getProducts());
      }
    );

    socket.on("disconnecting", () => {
      console.log(socket.id + " se desconecto");
    });

    socket.on("deleteProduct", async (productID) => {
      await productManager.deleteProduct(productID);
      websocketServer.emit("getProducts", await productManager.getProducts());
    });
  });
}
