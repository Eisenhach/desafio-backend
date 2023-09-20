import { cartModel } from "../models/cart.model.js";

class cartManager {
  async getCarts() {
    const carts = await cartModel.find().lean();
    return carts;
  }

  async addCart(cart) {
    const newCart = await cartModel.create(cart);
    return newCart.id;
  }

  async getCartById(id) {
    const cart = await cart.cartModel.find({ _id: id });
    return cart;
  }
}

export default cartManager;
