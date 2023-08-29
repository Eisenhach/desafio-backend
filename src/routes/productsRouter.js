import { Router } from "express";
import { productManager } from "../app.js";

const router = Router();

router.get("/", async (req, res) => {
  const limit = req.query.limit;
  const producto = await productManager.getProducts();

  if (limit) {
    return res.send(producto.slice(0, limit));
  }

  res.send(producto);
});

router.get("/:pid", async (req, res) => {
  const pid = parseInt(req.params.pid, 10);
  const producto = await productManager.getProducts();

  const productId = producto.find(({ id }) => id === pid);
  if (productId === undefined) {
    return res.status(404).send();
  }

  res.send(productId);
});

router.post("/", async (req, res) => {
  try {
    const { title, description, code, price, stock, category, thumbnails } =
      req.body;

    if (!title || !description || !code || !price || !stock || !category) {
      return res
        .status(400)
        .json({ error: "Todos los campos son obligatorios" });
    }

    const newProductId = await productManager.getId();

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

    await productManager.addProduct(newProduct);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error al agregar el producto:", error);
    res.status(500).json({ error: "Error al agregar el producto" });
  }
});

router.put("/:pid", async (req, res) => {
  let id = parseInt(req.params.pid);
  let update = req.body;
  await productManager.updateProduct(id, update);
  res.send("updated product");
});

router.delete("/:pid", async (req, res) => {
  let id = parseInt(req.params.pid);
  await productManager.deleteProduct(id);
  res.send("Deleted Product");
});

export default router;
