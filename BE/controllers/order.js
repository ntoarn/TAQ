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
    const order = await OrderModel.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Kiểm tra trạng thái đơn hàng
    if (order.status === "Hủy") {
      return res.status(400).json({ message: 'Không thể cập nhật trạng thái của đơn hàng đã hủy' });
    }
    if (order.status === "Đã giao hàng") {
      return res.status(400).json({ message: 'Không thể cập nhật trạng thái của đơn hàng đã giao' });
    }

    // Cập nhật trạng thái đơn hàng
    order.status = status;
    await order.save();

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOrdersByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const orders = await OrderModel.find({ userId });
    if (orders.length === 0) {
      return res.status(404).json({ error: 'No orders found' });
    }
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const cancelOrder = async (req, res) => {
  const { orderId } = req.body;
  try {
    const order = await OrderModel.findById(orderId);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Kiểm tra trạng thái đơn hàng
    if (order.status !== "Chờ xác nhận") {
      return res.status(400).json({ message: 'Đơn hàng không thể hủy' });
    }

    // Cập nhật trạng thái đơn hàng thành "Hủy"
    order.status = "Hủy";
    await order.save();

    res.status(200).json({ message: 'Đơn hàng đã hủy thành công', order });
  } catch (error) {
    console.error('Error canceling order:', error);
    res.status(500).json({ message: error.message });
  }
};
