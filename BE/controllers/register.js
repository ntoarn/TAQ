import UserModel from "../models/UserModel.js";
import { registerValue } from "../validations/user.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const { SECRET_CODE } = process.env;
export const register = async (req, res, next) => {
  try {
    const { error } = registerValue.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(404).json({
        message: errors,
      });
    }
    const userExists = await UserModel.findOne({ email: req.body.email });
    if (userExists) {
      return res.status(404).json({
        message: "Email da ton tai",
      });
    }
    const hashPassword = await bcryptjs.hash(req.body.password, 10);
    const user = await UserModel.create({
      ...req.body,
      password: hashPassword,
    });
    user.password = undefined;
    return res.status(201).json({
      message: "Dang ky thanh cong",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server Error",
    });
  }
};
