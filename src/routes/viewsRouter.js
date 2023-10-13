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

  const user = req.session.first_name;

  res.render("products", { products, user });

  req.context.socketSv.on("connection", (socket) => {
    console.log(`Cliente conectado a PRODUCTS con el id ${socket.id}`);
    req.context.socketSv.emit("products", products);
  });
});

viewsRouter.get("/login", publicRoutes, async (req, res) => {
  const { email, password } = req.body;

  if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
    req.session.role = "admin";
    console.log("Admin logged");
  } else {
    req.session.role = "usuario";
  }

  res.render("login");
});

viewsRouter.get("/logout", async (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

viewsRouter.get("/register", publicRoutes, async (req, res) => {
  const { email, password } = req.body;

  if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
    req.session.role = "admin";
    console.log("Admin logged");
  } else {
    req.session.role = "usuario";
  }

  res.render("signup");
});

viewsRouter.get("/profile", privateRoutes, async (req, res) => {
  const { first_name, last_name, email, age } = req.session;

  res.render("profile", { first_name, last_name, email, age });
});

viewsRouter.get("/recover", publicRoutes, (req, res) => {
  res.render("recover");
});

viewsRouter.get("/failregister", (req, res) => res.send("Fallo en registro"));

viewsRouter.get("/faillogin", (req, res) => res.send("Fallo en login"));

export default viewsRouter;
