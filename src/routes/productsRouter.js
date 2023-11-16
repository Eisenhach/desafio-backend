import express from "express";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

import adminRoutes from "../middleware/adminRoutes.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", adminRoutes, addProduct);
router.put("/:pid", adminRoutes, updateProduct);
router.delete("/:pid", adminRoutes, deleteProduct);

export default router;
