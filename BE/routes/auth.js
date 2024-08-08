import { Router } from "express";
import { getAllUser, getUser, lockUser, login, register, updateUser } from "../controllers/auth.js";
import { validBodyRequest } from "../middlewares/valiBodyReques.js";
import { loginValid, registerValue } from './../validations/user.js';



const userRouter = Router();
userRouter.post("/register",validBodyRequest(registerValue), register);
userRouter.post("/login",validBodyRequest(loginValid), login);
userRouter.get("/me/:id", getUser);
userRouter.put("/updateme/:id", updateUser);
userRouter.get("/", getAllUser);
userRouter.put('/:id/lock', lockUser);

export default userRouter;
