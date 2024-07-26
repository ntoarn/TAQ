import UserModel from "../models/UserModel.js";
import { loginValid } from "../validations/user.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const { SECRET_CODE } = process.env;
export const login = async (req, res, next) => {
  try {
    const { error } = loginValid.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(404).json({
        message: errors,
      });
    }
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        message: "Tai khoan khong ton tai",
      });
    }
    const isMatch = await bcryptjs.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(404).json({
        message: "Sai mat khau",
      });
    }
    const accessToken = await jwt.sign({ _id: user.id }, SECRET_CODE);
    user.password = undefined;
    return res.status(200).json({
      message: "Dang nhap thanh cong",
      user,
      accessToken,
    });
  } catch (error) {
    return rex.status(500).json({
      message: "Server Error",
    });
  }
};
