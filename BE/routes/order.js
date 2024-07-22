import { Router } from "express";
import {
  createOrder,
  deleteOrder,
  getAllOrder,
  getOrderById,
  updateOrder,
} from "../controllers/order.js";

const orderRouter = Router();
orderRouter.get("/", getAllOrder);
orderRouter.post("/", createOrder);
orderRouter.get("/:id", getOrderById);
orderRouter.put("/:id", updateOrder);
orderRouter.delete("/:id", deleteOrder);

export default orderRouter;
