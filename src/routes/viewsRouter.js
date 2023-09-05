import { Router } from "express";
import { productManager } from "../app.js";

const viewsRouter = Router();

viewsRouter.get("/realtimeproducts", async (req, res) => {
  const products = await productManager.getProducts();
  res.render("home", { products });

  req.context.socketSv.on("connection", (socket) => {
    console.log(`Client connected with the id ${socket.id}`);
    req.context.socketSv.emit("products", products);
  });
});

export default viewsRouter;
