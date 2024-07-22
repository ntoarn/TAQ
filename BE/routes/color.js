import { Router } from "express";
import {
  createColor,
  deleteColor,
  getAllColor,
  getColorById,
  updateColor,
} from "../controllers/color.js";

const colorRouter = Router();
colorRouter.get("/", getAllColor);
colorRouter.post("/", createColor);
colorRouter.get("/:id", getColorById);
colorRouter.put("/:id", updateColor);
colorRouter.delete("/:id", deleteColor);

export default colorRouter;
