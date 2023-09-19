import express from "express";
import productsRouter from "./routes/productsRouter.js";
import ProductManager from "./dao/filesystem/productManager.js";
import cartRouter from "./routes/cartsRouter.js";
import viewRouter from "./routes/viewsRouter.js";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import { Server } from "socket.io";
import { __dirname } from "./path.js";

const app = express();
const sv = app.listen(8080, () =>
  console.log("Iniciando servidor en puerto 8080")
);
sv.on("error", (error) => console.log(error));
const socketSv = new Server(sv);
const productManager = new ProductManager();

// me conecto a mi sv atlas
mongoose.connect(
  "mongodb+srv://eisenhachtomas:lVDRaVeAdUENQeV0@cluster0.mlljscz.mongodb.net/?retryWrites=true&w=majority"
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine());
app.set("views" + __dirname + "views");
app.set("view engine", "handlebars");
app.set("views", "./src/views");
app.use(express.static("./src/public"));

app.use((req, res, next) => {
  req.context = { socketSv };
  next();
});

// Endpoints
app.use("/", viewRouter);
app.use("/api/products", productsRouter);
app.use("api/carts", cartRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

export { app, productManager };
