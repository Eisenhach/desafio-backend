import { Router } from "express";
import cartManager from "../dao/managers/cartManager.js";
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
    ({ product }) => product === req.params.pid
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

cartsRouter.delete("/:cid/product/:pid", async (req, res) => {
  const cartId = req.params.cid;
  const id = req.params.pid;

  try {
    const result = await cartModel.deleteOne({ _id: id });

    if (result) {
      res
        .status(200)
        .send(`Producto eliminado bajo el ID del carrito ${cartId}`);
    } else {
      res.status(500).send("Error intentando eliminando el producto");
    }
  } catch (error) {
    console.error(error);
  }
});

cartsRouter.put("/:cid", async (req, res) => {});

export default cartsRouter;
