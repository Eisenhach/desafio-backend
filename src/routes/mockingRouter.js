import { Router } from "express";
import { generateProduct } from "../mocking/mocking.products.js";

const mockingRouter = Router();

mockingRouter.get("/", async (req, res) => {
  return generateProduct();
});

export default mockingRouter;
