import { Router } from "express";
import { forgotPassword } from "../controllers/forgotPassword.js";

const forgotpasswordRouter = Router();
forgotpasswordRouter.post("/forgot-password" , forgotPassword )
export default forgotpasswordRouter;