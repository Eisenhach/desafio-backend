import { Router } from "express";
import * as viewController from "../controllers/view.controller.js";
import publicRoutes from "../middleware/publicRoutes.js";
import privateRoutes from "../middleware/privateRoutes.js";

const viewsRouter = Router();

viewsRouter.get(
  "/realtimeproducts",
  viewController.realTimeProducts,
  async (req, res) => {}
);

viewsRouter.get("/chat", viewController.chat, async (req, res) => {});

viewsRouter.get(
  "/products",
  viewController.productsView,
  async (req, res) => {}
);

viewsRouter.get(
  "/login",
  viewController.login,
  publicRoutes,
  async (req, res) => {}
);

viewsRouter.get("/logout", viewController.logout, async (req, res) => {});

viewsRouter.get(
  "/register",
  viewController.register,
  publicRoutes,
  async (req, res) => {}
);

viewsRouter.get(
  "/profile",
  viewController.profile,
  privateRoutes,
  async (req, res) => {}
);

viewsRouter.get(
  "/recover",
  viewController.recover,
  publicRoutes,
  (req, res) => {}
);

viewsRouter.get("/failregister", viewController.failregister, (req, res) => {});

viewsRouter.get("/faillogin", viewController.faillogin, (req, res) => {});

export default viewsRouter;
