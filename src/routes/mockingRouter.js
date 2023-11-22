import { Router } from "express";
import { generateProduct } from "../mocking/mocking.products.js";

const mockingRouter = Router();

mockingRouter.get("/", async (req, res) => {
  const productMock = generateProduct();
  res.json(productMock);
});

export default mockingRouter;
