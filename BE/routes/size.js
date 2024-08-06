import { Router } from "express";
import {
  createSize,
  deleteSize,
  getAllSize,
  getSizeById,
  updateSize,
} from "../controllers/size.js";

const sizeRouter = Router();
sizeRouter.get("/", getAllSize);
sizeRouter.post("/", createSize);
sizeRouter.get("/:id", getSizeById);
sizeRouter.put("/:id", updateSize);
sizeRouter.delete("/:id", deleteSize);

export default sizeRouter;
