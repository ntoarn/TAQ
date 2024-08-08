import { Router } from "express";
import { Payment } from "../controllers/momo.js";

const PaymentRouter = Router();

PaymentRouter.post("/payment", Payment);


export default PaymentRouter;
