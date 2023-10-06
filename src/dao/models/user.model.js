import mongoose from "mongoose";

const userCollection = "usuarios";

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  age: Number,
  password: String,
  role: { type: String, default: "usuario" },
});

const userModel = mongoose.model(userCollection, userSchema);

export { userModel };
