import express from 'express';
import { createOrder, getOrders, getOrderById, updateOrder, deleteClientorder, deleteOrder } from '../controllers/order.js';

const orderRouter = express.Router();

orderRouter.post('/orders', createOrder);
orderRouter.get('/orders', getOrders);
orderRouter.get('/orders/:orderId', getOrderById);
orderRouter.put('/orders/:orderId', updateOrder);
orderRouter.delete('/orders/:userId', deleteClientorder);
orderRouter.delete('/orders/:orderId', deleteOrder);

export default orderRouter;
