import { cartModel } from "../dao/models/cart.model.js";

export class CartRepository {
  async get() {
    return await cartModel.find().lean();
  }

  async add(cart) {
    return await cartModel.create(cart);
  }

  async getById(id) {
    return await cartModel.findById(id);
  }

  async addToCart(cid, pid, product) {
    return await cartModel.findById(cid);
  }

  async delete(id) {
    return await cartModel.deleteOne({ _id: id });
  }
}
