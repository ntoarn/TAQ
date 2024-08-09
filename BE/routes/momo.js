import { Router } from "express";
import { callback, Payment, transaction } from "../controllers/momo.js";

const PaymentRouter = Router();

PaymentRouter.post("/payment", Payment);
PaymentRouter.post("/callback", callback);
PaymentRouter.post("/check-status-transaction", transaction);


export default PaymentRouter;
