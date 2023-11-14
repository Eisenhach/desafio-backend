import { CartRepository } from "../../repository/cart.repository.js";

const cartRepository = new CartRepository();

class cartManager {
  async getCarts() {
    try {
      const carts = await cartRepository.get();
      return carts;
    } catch (error) {
      console.error("Fallo al obtener los productos", error);
    }
  }

  async addCart(cart) {
    try {
      const newCart = await cartRepository.add(cart);
      return newCart;
    } catch (error) {
      console.error("Error en crear el cart", error);
    }
  }

  async getCartById(id) {
    try {
      const cart = await cartRepository.getById(id);
      return cart;
    } catch (error) {
      console.error("Error al obtener el cart por ID", error);
    }
  }

  async addProductsToCart(cid, pid, product) {
    try {
      const selectedCart = await cartRepository.addToCart(cid);

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

  async deleteProduct(id) {
    try {
      const data = await cartRepository.delete(id);

      if (data.deletedCount > 0) {
        return "Producto eliminado del carrito";
      } else {
        return "Hubo un error eliminando el producto";
      }
    } catch (error) {
      console.error("Error eliminando el producto", error);
    }
  }
}

export default cartManager;
