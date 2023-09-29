import { Router } from "express";
import { productManager } from "../app.js";

const viewsRouter = Router();

viewsRouter.get("/realtimeproducts", async (req, res) => {
  const products = await productManager.getProducts();
  res.render("realtimeproducts", { products });

  req.context.socketSv.on("connection", (socket) => {
    console.log(
      `Client connected in realtimeproducts with the id ${socket.id}`
    );
    req.context.socketSv.emit("products", products);
  });
});

viewsRouter.get("/chat", async (req, res) => {
  res.render("chat", {});

  req.context.socketSv.on("connection", (socket) => {
    console.log(`Client conected in CHAT with the id ${socket.id}`);
  });
});

viewsRouter.get("/products", async (req, res) => {
  const products = await productManager.getProductsForView();
  res.render("products", { products });

  req.context.socketSv.on("connection", (socket) => {
    console.log(`Cliente conectado a PRODUCTS con el id ${socket.id}`);
    req.context.socketSv.emit("products", products);
  });
});

export default viewsRouter;
