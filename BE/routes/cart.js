import { Router } from "express";
import {
  createCart,
  deleteCart,
  getAllCart,
  getCartById,
  updateCart,
} from "../controllers/cart.js";

const cartRouter = Router();
cartRouter.get("/", getAllCart);
cartRouter.post("/", createCart);
cartRouter.get("/:id", getCartById);
cartRouter.put("/:id", updateCart);
cartRouter.delete("/:id", deleteCart);

export default cartRouter;
