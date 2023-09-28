import { Router } from "express";
import productManager from "../dao/database/productManager.js";
import { productModel } from "../dao/models/product.model.js";

const router = Router();
const productMgr = new productManager();

router.get("/", async (req, res) => {
  const products = await productMgr.getPaginateProducts(req.query);
  res.send(products);
});

router.post("/", async (req, res) => {
  try {
    const { title, description, code, price, stock, category, thumbnails } =
      req.body;

    if (!title || !description || !price || !stock) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios" });
    }

    const newProductId = await productMgr.getProductsById();

    const newProduct = {
      title,
      description,
      price,
      thumbnails,
      code,
      stock,
      category,
      status: true,
      id: newProductId,
    };

    await productMgr.addProduct(newProduct);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error al agregar el producto:", error);
    res.status(500).json({ error: "Error al agregar el producto" });
  }
});

router.put("/:pid", async (req, res) => {
  let id = req.params.pid;
  let update = req.body;
  await productMgr.updateProduct(id, update);
  res.send("updated product");
});

router.delete("/:pid", async (req, res) => {
  let id = req.params.pid;
  await productMgr.deleteProduct(id);
  res.send("Deleted Product");
});

export default router;
