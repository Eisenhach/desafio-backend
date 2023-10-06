import { Router } from "express";
import { userModel } from "../dao/models/user.model.js";

const userRouter = Router();

userRouter.post("/signup", async (req, res) => {
  const { first_name, last_name, email, age, password } = req.body;

  const userExists = await userModel.findOne({ email });

  if (userExists) {
    return res.send("Ya te registraste con ese email");
  }

  const user = await userModel.create({
    first_name,
    last_name,
    email,
    age,
    password,
  });

  req.session.first_name = first_name;
  req.session.last_name = last_name;
  req.session.email = email;
  req.session.age = age;
  req.session.isLogged = true;

  res.redirect("/profile");
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email, password }).lean();

  if (!user) {
    return res.send("Tu contraseña o email son incorrectos");
  }

  req.session.first_name = user.first_name;
  req.session.last_name = user.last_name;
  req.session.email = user.email;
  req.session.age = user.age;
  req.session.isLogged = true;

  res.redirect("/profile");
});

export default userRouter;
