import OrderModel from "../models/OrderModel.js";

export const getAllOrder = async (req, res) => {
  try {
    const order = await OrderModel.find({})
      .populate("userId")
      .populate("products");
    if (!order || order.length === 0) {
      return res.status(404).json({
        message: "Khong tim thay danh muc",
      });
    }
    return res.status(200).json({
      message: "Lay danh muc thanh cong",
      data: order,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await OrderModel.findById(req.params.id).populate("products");
    if (!order) {
      return res.status(404).json({
        message: "Khong tim thay danh muc",
      });
    }
    return res.status(200).json({
      message: "Lay danh muc thanh cong",
      data: order,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

export const createOrder = async (req, res) => {
  try {
    console.log("Received data:", req.body);
    const order = await OrderModel.create(req.body);

    if (!order) {
      return res.status(400).json({
        message: "Thêm đơn hàng thất bại",
      });
    }

    return res.status(200).json({
      message: "Thêm đơn hàng thành công",
      data: order,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({
      error: error.message,
    });
  }
};
export const updateOrder = async (req, res) => {
  try {
    // const { error } = sizeValid.validate(req.body, {abortEarly: false})
    // if(error) {
    //     const errors = error.details.map(err => err.message)
    //     return res.status(500).json({
    //         message: errors
    //     })
    // }
    const order = await OrderModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!order) {
      return res.status(404).json({
        message: "Update danh muc that bai",
      });
    }
    return res.status(200).json({
      message: "Update danh muc thanh cong",
      data: order,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
export const deleteOrder = async (req, res) => {
  try {
    const order = await OrderModel.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({
        message: "Them danh muc that bai",
      });
    }
    return res.status(200).json({
      message: "Them danh muc thanh cong",
      data: order,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};
