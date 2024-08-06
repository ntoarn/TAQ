import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const { SECRET_CODE } = process.env;

export const generateToken = (payload, expiresIn = "10d") => {
	return jwt.sign(payload, SECRET_CODE, { expiresIn: expiresIn });
};

export const verifyToken = (token) => {
	return jwt.verify(token, SECRET_CODE);
};