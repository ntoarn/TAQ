import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import UserModel from "../models/UserModel.js";
dotenv.config();
const { SECRET_CODE } = process.env;

export const checkPermission = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(403).json({
        message: "Ban chua dang nhap",
      });
    }
    const decoded = jwt.verify(token, SECRET_CODE);
    const user = await UserModel.findById(decoded._id);
    if (!user) {
      return res.status(403).json({
        message: "Ban khong co quyen tuy cap",
      });
    }
    if (user.role !== "admin") {
      return res.status(403).json({
        message: "Ban khong phai admin",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      name: error.name,
      message: error.message,
    });
  }
};
