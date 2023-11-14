import productManager from "../dao/managers/productManager.js";

const productMgr = new productManager();

export const realTimeProducts = async (req, res) => {
  const products = await productMgr.getProducts();
  res.render("realtimeproducts", { products });

  req.context.socketSv.on("connection", (socket) => {
    console.log(
      `Client connected in realtimeproducts with the id ${socket.id}`
    );
    req.context.socketSv.emit("products", products);
  });
};

export const chat = async (req, res) => {
  res.render("chat", {});

  req.context.socketSv.on("connection", (socket) => {
    console.log(`Client conected in CHAT with the id ${socket.id}`);
  });
};

export const productsView = async (req, res) => {
  const products = await productMgr.getProductsForView(
    req.query.limit,
    req.query.page,
    req.query.sort
  );

  const user = req.session.first_name;

  res.render("products", { products, user });

  req.context.socketSv.on("connection", (socket) => {
    console.log(`Cliente conectado a PRODUCTS con el id ${socket.id}`);
    req.context.socketSv.emit("products", products);
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
    req.session.role = "admin";
    console.log("Admin logged");
  } else {
    req.session.role = "usuario";
  }

  res.render("login");
};

export const logout = async (req, res) => {
  req.session.destroy();
  res.redirect("/login");
};

export const register = async (req, res) => {
  const { email, password } = req.body;

  if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
    req.session.role = "admin";
    console.log("Admin logged");
  } else {
    req.session.role = "usuario";
  }

  res.render("signup");
};

export const profile = async (req, res) => {
  const { first_name, last_name, email, age } = req.session;

  res.render("profile", { first_name, last_name, email, age });
};

export const recover = async (req, res) => {
  res.render("recover");
};

export const failregister = async (req, res) => {
  res.send("Fallo en registro");
};
export const faillogin = async (req, res) => {
  res.send("Fallo en login");
};
