import cartManager from "../dao/managers/cartManager.js";

const cartMgr = new cartManager();

export const getCarts = async (req, res) => {
  try {
    const carts = await cartMgr.getCarts();
    const limit = req.query.limit;

    if (limit) {
      return res.send(carts.slice(0, limit));
    }

    res.send(carts);
  } catch (error) {
    console.error("Error al obtener carritos", error);
    res.status(500).json({ error: "Error 500 en el controller" });
  }
};

export const createCart = async (req, res) => {
  try {
    const { products } = req.body;
    const cart = await cartMgr.createCart({ products });
    res.send(cart);
  } catch (error) {
    console.error("Error al crear el carrito", error);
    res.status(500).json({ error: "Error al crear el carrito" });
  }
};

export const getCartById = async (req, res) => {
  try {
    const cart = await cartMgr.getCartById(req.params.cid);
    res.send(cart.products);
  } catch (error) {
    console.error("Error al obtener el carrito por ID", error);
    res.status(500).json({ error: "Error 500 en el controller" });
  }
};

export const addProductToCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cart = await cartMgr.addProductToCart(cid, pid);
    res.send(cart);
  } catch (error) {
    console.error("Error al agregar producto al carrito", error);
    res.status(500).json({ error: "Error 500 en el controller" });
  }
};

export const removeProductFromCart = async (req, res) => {
  try {
    const { cid, pid } = req.params;
    await cartMgr.removeProductFromCart(cid, pid);
    res.status(200).send(`Producto eliminado bajo el ID del carrito ${cid}`);
  } catch (error) {
    console.error("Error al eliminar producto del carrito", error);
    res.status(500).json({ error: "Error 500 en el controller" });
  }
};
