import CartModel from "../models/CartModel.js";
import OrderModel from "../models/OrderModel.js";

export const createOrder = async (req, res) => {
  try {
     const { userId, items, totalPrice, customerInfo } = req.body;
     console.log('Received Order Data:', { userId, items, totalPrice, customerInfo }); 
     const order = await OrderModel.create({ userId, items, totalPrice, customerInfo });
     await CartModel.updateOne({ userId }, { $unset: { products: "" } });
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
          return res.status(404).json({ error: "No orders found" });
      }
      const processedOrders = orders.map((order) => ({
        ...order.toObject(),
        createdAtVN: moment(order.createdAt)
          .tz("Asia/Ho_Chi_Minh")
          .format("YYYY-MM-DD HH:mm:ss"),
      }));
  
      return res.status(200).json(processedOrders);
  } catch (error) {
      return res.status(500).json({ error: error.message });
  }
};
export const getOrderById = async (req, res) => {
  const { orderId } = req.params;
  try {
    const order = await OrderModel.findById(orderId).populate("userId");
    if (!order) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const updateOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    const order = await OrderModel.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Not found" });
    }
    const data = await OrderModel.findByIdAndUpdate({ _id: orderId }, req.body, {
      new: true,
    });
    return res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const deleteClientorder = async (req, res) => {
  const { userId } = req.params;
  try {
    const order = await OrderModel.findById(userId);
    if (!order) {
      return res.status(404).json({ message: "Not found" });
    }
    await OrderModel.findByIdAndDelete(userId);
    return res.status(200).json({ message: "Delete success" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const deleteOrder = async (req, res) => {
  const { orderId } = req.params;
  try {
    const order = await OrderModel.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Not found" });
    }
    await OrderModel.findByIdAndDelete(orderId);
    return res.status(200).json({ message: "Delete success" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
