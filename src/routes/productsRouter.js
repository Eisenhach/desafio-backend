import express from "express";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", addProduct);
router.put("/:pid", updateProduct);
router.delete("/:pid", deleteProduct);

export default router;
