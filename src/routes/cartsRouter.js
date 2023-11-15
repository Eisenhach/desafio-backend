import { Router } from "express";
import * as cartController from "../controllers/cart.controller.js";

const cartsRouter = Router();

cartsRouter.get("/", cartController.getCarts);

cartsRouter.post("/", cartController.createCart);

cartsRouter.get("/:cid", cartController.getCartById);

cartsRouter.post("/:cid/product/:pid", cartController.addProductToCart);

cartsRouter.delete("/:cid/product/:pid", cartController.removeProductFromCart);

cartsRouter.get("/:cid/purchase", cartController.purchase);

export default cartsRouter;
