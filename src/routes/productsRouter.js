import { Router } from "express";
import productManager from "../dao/database/productManager.js";

const router = Router();
const productMgr = new productManager();

router.get("/", async (req, res) => {
  const limit = req.query.limit;
  const producto = await productMgr.getProducts();

  if (limit) {
    return res.send(producto.slice(0, limit));
  }

  res.send(producto);
});

router.get("/:pid", async (req, res) => {
  const pid = req.params.pid;
  const product = await productMgr.getProductsById(pid);

  if (!product) {
    return res.status(404).send("Producto no encontrado");
  }

  res.send(product);
});

router.post("/", async (req, res) => {
  try {
    const { title, description, code, price, stock, category, thumbnails } =
      req.body;

    if (!title || !description || !price || !stock || !category) {
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
