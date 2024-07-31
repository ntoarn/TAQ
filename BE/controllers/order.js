import OrderModel from "../models/OrderModel.js";

export const createOrder = async (req, res) => {
  try {
    
     const { userId, items, totalPrice, customerInfo } = req.body;
     console.log('Received Order Data:', { userId, items, totalPrice, customerInfo }); 
     const order = await OrderModel.create({ userId, items, totalPrice, customerInfo });
     return res.status(201).json(order);
  } catch (error) {
    console.error('Error Creating Order:', error);  // Thêm ghi log lỗi
    return res.status(500).json({ message: error.message });
  }
};
export const getOrders = async (req, res) => {
  try {
      const order = await Order.find();
      if (order.length === 0) {
          return res.status(404).json({ error: "No orders found" });
      }
      return res.status(200).json(order);
  } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};
