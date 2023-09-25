import { Router } from "express";
import { productManager } from "../app.js";

const viewsRouter = Router();

viewsRouter.get("/realtimeproducts", async (req, res) => {
  const products = await productManager.getProducts();
  res.render("home", { products });

  req.context.socketSv.on("connection", (socket) => {
    console.log(
      `Client connected in realtimeproducts with the id ${socket.id}`
    );
    req.context.socketSv.emit("products", products);
  });
});

viewsRouter.get("/chat", async (req, res) => {
  res.render("chat");
});

export default viewsRouter;
