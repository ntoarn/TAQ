import UserModel from "../models/UserModel.js";
import { registerValue } from "../validations/user.js";
import bcryptjs from "bcryptjs";

export const register = async (req, res, next) => {
  try {
    console.log("Request body:", req.body); // Log request body

    const { error } = registerValue.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      console.log("Validation errors:", errors); // Log validation errors
      return res.status(404).json({
        message: errors,
      });
    }

    const userExists = await UserModel.findOne({ email: req.body.email });
    if (userExists) {
      console.log("User already exists with email:", req.body.email); // Log existing user
      return res.status(404).json({
        message: "Email da ton tai",
      });
    }

    const hashPassword = await bcryptjs.hash(req.body.password, 10);
    console.log("Hashed password:", hashPassword); // Log hashed password

    const user = await UserModel.create({
      ...req.body,
      password: hashPassword,
    });
    user.password = undefined;

    console.log("User created successfully:", user); // Log created user
    return res.status(201).json({
      message: "Dang ky thanh cong",
      data: user,
    });
  } catch (error) {
    console.error("Server error:", error); // Log server error
    return res.status(500).json({
      message: "Server Error",
    });
  }
};
