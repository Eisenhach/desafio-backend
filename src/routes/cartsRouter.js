import { Router } from "express";
import CartManager from "../dao/database/cartManager.js";
import productManager from "../dao/filesystem/productManager.js";

const cartRouter = Router();
const manager = new CartManager("./src/carts.json");
const products = new productManager("../../products.json");

let newCart = { id: 0, products: [] };

cartRouter.get("/test", async (req, res) => {
  res.send("Testeo de Router");
});

cartRouter.post("/", async (req, res) => {
  await manager.addCart(newCart);
  res.send("Carrito añadido con exito");
});

cartRouter.get("/:cid", async (req, res) => {
  const id = parseInt(req.params.cid);
  const cartId = await manager.getCartById(id);
  !cartId ? res.send("ID no encontrado") : res.send(cartId.products);
});

cartRouter.post("/:cid/product/:pid", async (req, res) => {
  const cid = parseInt(req.params.cid);
  const pid = parseInt(req.params.pid);
  const totalProducts = await products.getProducts();
  const productId = totalProducts.find((e) => e.id == pid);
  const newProduct = { id: productId.id, quantity: 1 };
  await manager.addProductsToCart(cid, pid, newProduct);

  res.send("Producto añadido al carrito satisfactoriamente");
});

export default cartRouter;
