import { cartModel } from "../models/cart.model.js";

class cartManager {
  async getCarts() {
    try {
      const carts = await cartModel.find().lean();
      return carts;
    } catch (error) {
      console.error("Fallo al obtener los productos", error);
    }
  }

  async addCart(cart) {
    try {
      const newCart = await cartModel.create(cart);
      return newCart;
    } catch (error) {
      console.error("Error en crear el cart", error);
    }
  }

  async getCartById(id) {
    try {
      const cart = await cartModel.findById(id);
      return cart;
    } catch (error) {
      console.error("Error al obtener el cart por ID", error);
    }
  }

  async addProductsToCart(cid, pid, product) {
    try {
      const selectedCart = await cartModel.findById(cid);

      if (!selectedCart) {
        return console.log("No encontrado");
      }

      const existingProduct = selectedCart.products.find(
        (prod) => prod.id === pid
      );

      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        selectedCart.products.push({ id: pid, quantity: 1 });
      }
      await selectedCart.save();
      console.log("Producto añadido con exito");
    } catch (error) {
      console.error("Error al añadir el producto al carrito", error);
    }
  }
}

export default cartManager;
