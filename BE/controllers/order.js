// controllers/orderController.js
import OrderModel from '../models/OrderModel.js';
import CartModel from '../models/CartModel.js';

export const createOrder = async (req, res) => {
  try {
    const { userId, items, totalPrice, customerInfo } = req.body;
    console.log('Received Order Data:', { userId, items, totalPrice, customerInfo });

    const orderNumber = `ORD-${Date.now()}`;
    const order = await OrderModel.create({ userId, items, totalPrice, customerInfo, orderNumber });
    await CartModel.findOneAndDelete({ userId });
    return res.status(201).json(order);
  } catch (error) {
    console.error('Error Creating Order:', error);
    return res.status(500).json({ message: error.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find();
    if (orders.length === 0) {
      return res.status(404).json({ error: 'No orders found' });
    }
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  const { orderId, status } = req.body;
  try {
    const order = await OrderModel.findByIdAndUpdate(orderId, { status }, { new: true });
    if (!order) {
      return res.status(404).send({ message: 'Order not found' });
    }
    res.send(order);
  } catch (error) {
    res.status(500).send(error);
  }
};
