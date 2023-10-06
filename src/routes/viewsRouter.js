import { Router } from "express";
import { productManager } from "../app.js";
import publicRoutes from "../middleware/publicRoutes.js";
import privateRoutes from "../middleware/privateRoutes.js";

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
  const products = await productManager.getProductsForView(
    req.query.limit,
    req.query.page,
    req.query.sort
  );
  res.render("products", { products });

  req.context.socketSv.on("connection", (socket) => {
    console.log(`Cliente conectado a PRODUCTS con el id ${socket.id}`);
    req.context.socketSv.emit("products", products);
  });
});

viewsRouter.get("/login", publicRoutes, async (req, res) => {
  res.render("login");
});

viewsRouter.get("/logout", async (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

viewsRouter.get("/signup", publicRoutes, async (req, res) => {
  res.render("signup");
});

viewsRouter.get("/profile", privateRoutes, async (req, res) => {
  const { first_name, last_name, email, age } = req.session;

  res.render("profile", { first_name, last_name, email, age });
});

export default viewsRouter;
