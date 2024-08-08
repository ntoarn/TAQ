import { Router } from "express";
import { createOrder, getOrders, updateOrderStatus } from "../controllers/order.js";



const orderRouter = Router();
orderRouter.post("/", createOrder);
orderRouter.get("/", getOrders);
orderRouter.put("/status", updateOrderStatus);

export default orderRouter;
