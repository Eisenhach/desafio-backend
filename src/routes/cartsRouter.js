import { Router } from "express";
import cartManager from "../dao/database/cartManager.js";
import { cartModel } from "../dao/models/cart.model.js";

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
  const { products } = req.body;
  const cart = await cartModel.create({ products });
  res.send(cart);
});
//
cartsRouter.get("/:cid", async (req, res) => {
  const cart = await cartModel
    .findOne({ _id: req.params.cid })
    .populate("products.product");
  res.send(cart.products);
});

cartsRouter.post("/:cid/product/:pid", async (req, res) => {
  const cart = await cartModel.findOne({ _id: req.params.cid });
  const oldProduct = cart.products.find(
    ({ product }) => product.toString() === req.params.pid
  );

  if (oldProduct) {
    oldProduct.quantity += 1;
  } else {
    cart.products.push({
      product: req.params.pid,
      quantity: 1,
    });
  }

  const update = await cartModel.updateOne({ _id: req.params.cid }, cart);
  res.send(update);
});

export default cartsRouter;
