import { Router } from "express";
import cartManager from "../dao/database/cartManager.js";

const cartsRouter = Router();
const cartMgr = new cartManager();

cartsRouter.get("/", async (req, res) => {
  const limit = req.query.limit;
  const cart = await cartMgr.getCarts();

  if (limit) {
    return res.send(cart.slice(0, limit));
  }
  res.send(cart);
});

cartsRouter.post("/", async (req, res) => {
  try {
    const newCartData = req.body;
    const newCart = await cartMgr.addCart(newCartData);
    res.status(200).json(newCart);
  } catch (error) {
    console.error("Error al agregar el carrito", error);
    res.status(500).json({ error: "Error al agregar el carrito" });
  }
});

cartsRouter.get("/:cid", async (req, res) => {
  const cid = req.params.cid;
  const cart = await cartMgr.addCart(cid);

  if (!cart) {
    return res.status(404).send("No encontrado en el carrito por esa ID");
  }

  res.send(cart);
});

cartsRouter.post("/:cid/product/:pid", async (req, res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;

  try {
    await cartMgr.addProductsToCart(cid, pid);
    res.send("Producto añadido al carrito con exito");
  } catch (error) {
    console.error("Error al agregar el producto al carrito", error);

    res.status(500).send("Error al agrear el producto al carrito");
  }
});

export default cartsRouter;
