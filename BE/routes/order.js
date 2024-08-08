import { Router } from "express";
import { cancelOrder, createOrder, getOrders, getOrdersByUser, updateOrderStatus } from "../controllers/order.js";



const orderRouter = Router();
orderRouter.post("/", createOrder);
orderRouter.get("/", getOrders);
orderRouter.put("/status", updateOrderStatus);
orderRouter.get("/user/:userId", getOrdersByUser);
orderRouter.post("/cancel", cancelOrder)

export default orderRouter;
