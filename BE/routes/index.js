import { Router } from "express";
import categoryRouter from "./category.js";
import productRouter from "./product.js";

import cartRouter from "./cart.js";
import colorRouter from "./color.js";
import orderRouter from "./order.js";
import sizeRouter from "./size.js";
import userRouter from "./auth.js";
import forgotpasswordRouter from "./forgotpassword.js";
import PaymentRouter from "./momo.js";

const router = Router();

router.use("/products", productRouter);
router.use("/categories", categoryRouter);
router.use("/size", sizeRouter);
router.use("/color", colorRouter);
router.use("/order", orderRouter);
router.use("/cart", cartRouter);
router.use("/users", userRouter)
router.use("/auth", forgotpasswordRouter)
router.use("/", PaymentRouter)

export default router;
