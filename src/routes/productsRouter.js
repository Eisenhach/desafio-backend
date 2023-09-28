import { Router } from "express";
import productManager from "../dao/database/productManager.js";
import { productModel } from "../dao/models/product.model.js";

const router = Router();
const productMgr = new productManager();

router.get("/", async (req, res) => {
  const { limit, page, sort, query } = req.query;

  const sortObjetMapper = {
    asc: { price: 1 },
    desc: { price: -1 },
  };

  const modelQuery = query ? JSON.parse(query) : {};
  const modelLimit = limit ? parseInt(limit, 10) : 10;
  const modelPage = page ? parseInt(page, 10) : 1;
  const modelSort = sortObjetMapper[sort] ?? undefined;

  const products = await productModel.paginate(modelQuery, {
    limit: modelLimit,
    page: modelPage,
    sort: modelSort,
  });

  const response = {
    status: "success",
    payload: products.docs,
    totalDocs: products.totalDocs,
    limit: products.limit,
    totalPages: products.totalPages,
    page: products.page,
    pagingCounter: products.pagingCounter,
    hasPrevPage: products.hasPrevPage,
    hasNextPage: products.hasNextPage,
    prevPage: products.prevPage,
    nextPage: products.nextPage,
  };

  res.send(response);
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
