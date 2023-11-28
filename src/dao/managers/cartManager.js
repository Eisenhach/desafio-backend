import { CartRepository } from "../../repository/cart.repository.js";
import { ProductRepository } from "../../repository/product.repository.js";
import { TicketRepository } from "../../repository/ticket.repository.js";
import crypto from "crypto";
import mongoose from "mongoose";

const cartRepository = new CartRepository();
const productRepository = new ProductRepository();
const ticketRepository = new TicketRepository();

class cartManager {
  async getCarts() {
    try {
      const carts = await cartRepository.get();
      return carts;
    } catch (error) {
      logger.error(error);
    }
  }

  async addCart(cart) {
    try {
      const newCart = await cartRepository.add(cart);
      return newCart;
    } catch (error) {
      logger.error(error);
    }
  }

  async getCartById(id) {
    try {
      const cart = await cartRepository.getById(id);
      return cart;
    } catch (error) {
      logger.error(error);
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
    } catch (error) {
      logger.error(error);
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
      logger.error(error);
    }
  }

  purchaseCart = async (id, purchaser) => {
    try {
      const cart = await cartRepository.getById(id);
      const productsCart = cart.products;
      console.log(cart, "cart");
      console.log(productsCart, "productsCart");
      let productsPurchased = [];
      let productsNotPurchased = [];
      let amount = 0;

      if (productsCart.length === 0) {
        return console.log(
          "No puedes realizar la compra, ya que no tienes productos en el carrito."
        );
      }

      for (const item of productsCart) {
        const product = await productRepository.getById(id);

        if (item.quantity <= product.stock) {
          // Si hay suficiente stock, restar del stock y agregar al array de productos comprados
          product.stock -= item.quantity;
          await product.save();
          productsPurchased.push(item);

          // Calcular el total solo para los productos comprados
          const productTotal = item.product.price * item.quantity;
          amount += productTotal;
        } else {
          // Si no hay suficiente stock, agregar al array de productos no comprados
          productsNotPurchased.push(item);
        }
      }

      // Guardar el carrito actualizado
      cart.products = productsNotPurchased;
      await cart.save();

      function generateUniqueCode() {
        return crypto.randomBytes(12).toString("hex");
      }
      console.log(productsPurchased, "purcheased");
      console.log(productsNotPurchased, "notPur");
      console.log(amount);
      const code = generateUniqueCode();
      // Crear el ticket solo con los productos comprados
      const newTicket = await ticketRepository.create(code, amount, purchaser);
      console.log(newTicket, "newTicket");

      return { newTicket, productsNotPurchased };
    } catch (error) {
      logger.error(error);
    }
  };
}

export default cartManager;
