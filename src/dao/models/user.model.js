import mongoose from "mongoose";
import { cartModel } from "./cart.model.js";
import { ResetRepository } from "../../repository/resetcode.repository.js";

const resetRepository = new ResetRepository();
const userCollection = "usuarios";

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  age: Number,
  password: String,
  role: { type: String, default: "usuario" },
  cartId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "carts",
    default: "651cc09a80586b8b948e267d",
  },
  resetCode: {
    type: String,
    default: resetRepository.create,
  },
});

const userModel = mongoose.model(userCollection, userSchema);

export { userModel };
