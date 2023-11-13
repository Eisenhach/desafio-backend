import productManager from "../dao/managers/productManager.js";

const productMgr = new productManager();

export const getProducts = async (req, res) => {
  try {
    const products = await productMgr.getPaginateProducts(req.query);
    res.send(products);
  } catch (error) {
    console.error("Error al obtener productos", error);
    res.status(500).json({ error: "Error 500 en el controller" });
  }
};

export const addProduct = async (req, res) => {
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
};

export const updateProduct = async (req, res) => {
  try {
    const id = req.params.pid;
    const update = req.body;
    await productMgr.updateProduct(id, update);
    res.send("Producto actualizado");
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    res.status(500).json({ error: "Error al actualizar el producto" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.pid;
    await productMgr.deleteProduct(id);
    res.send("Producto eliminado");
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    res.status(500).json({ error: "Error al eliminar el producto" });
  }
};
