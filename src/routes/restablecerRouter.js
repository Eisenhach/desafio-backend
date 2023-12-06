import { Router } from "express";
import { sendMail } from "../controllers/resetCode.controller.js";
const router = Router();

router.get("/", sendMail);

export default router;
