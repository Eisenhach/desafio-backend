import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import productsRouter from "./routes/productsRouter.js";
import ProductManager from "./dao/database/productManager.js";
import cartsRouter from "./routes/cartsRouter.js";
import userRouter from "./routes/userRouter.js";
import viewsRouter from "./routes/viewsRouter.js";
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
  "mongodb+srv://eisenhachtomas:coderhouse123@ecommerce.qcgvpfh.mongodb.net/?retryWrites=true&w=majority"
);

export const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error"));
db.once("open", () => {
  console.log("Connection to MongoDB established successfully");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Config session
app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://eisenhachtomas:coderhouse123@ecommerce.qcgvpfh.mongodb.net/?retryWrites=true&w=majority",
      ttl: 15,
    }),
    secret: "super",
    resave: false,
    saveUninitialized: false,
  })
);

app.engine("handlebars", handlebars.engine());
app.set("views" + __dirname + "/views");
app.set("view engine", "handlebars");
app.set("views", "./src/views");
app.use(express.static("./src/public"));

app.use((req, res, next) => {
  req.context = { socketSv };
  next();
});

// Endpoints
app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api", userRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

export { app, productManager };
