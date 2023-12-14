import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import productsRouter from "./routes/productsRouter.js";
import ProductManager from "./dao/managers/productManager.js";
import cartsRouter from "./routes/cartsRouter.js";
import userRouter from "./routes/userRouter.js";
import viewsRouter from "./routes/viewsRouter.js";
import loggerRouter from "./routes/loggerRouter.js";
import restablecerRouter from "./routes/restablecerRouter.js";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import { Server } from "socket.io";
import { __dirname } from "./path.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";

//

import passport from "passport";
import initializePassport from "./config/passport.config.js";
import mockingRouter from "./routes/mockingRouter.js";

//

const app = express();
const sv = app.listen(8080, () =>
  console.log("Iniciando servidor en puerto 8080")
);
sv.on("error", (error) => console.log(error));
const socketSv = new Server(sv);
const productManager = new ProductManager();

// me conecto a mi sv atlas
mongoose.connect(process.env.MONGODB_URL);
export const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error"));
db.once("open", () => {
  console.log("Connection to MongoDB established successfully");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Config session   con .env
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URL,
      ttl: 100,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

initializePassport();

app.engine("handlebars", handlebars.engine());
app.set("views" + __dirname + "/views");
app.set("view engine", "handlebars");
app.set("views", "./src/views");
app.use(express.static("./src/public"));

app.use((req, res, next) => {
  req.context = { socketSv };
  next();
});

const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Documentacion",
      description: "Documentacion APi",
    },
  },
  apis: [`${__dirname}/docs/**/*.yaml`],
};
const specs = swaggerJSDoc(swaggerOptions);

// Endpoints

app.use("/", viewsRouter);
app.use("/docs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));
app.use("/reset-password", restablecerRouter);
app.use("/logger", loggerRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api", userRouter);
app.use("/mockingproducts", mockingRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

export { app, productManager };
