import { Router } from "express";
import { createOrder, getOrders } from "../controllers/order.js";



const orderRouter = Router();
orderRouter.post("/", createOrder);
orderRouter.get("/", getOrders);

export default orderRouter;
