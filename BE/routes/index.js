import { Router } from "express";
import productRouter from "./product.js";
import categoryRouter from "./category.js";
import { login } from './../controllers/login.js';
import { register } from './../controllers/register.js';
import sizeRouter from "./size.js";
import colorRouter from "./color.js";
import orderRouter from "./order.js";
import cartRouter from "./cart.js";

const router = Router();
router.use('/products', productRouter)
router.use('/categories', categoryRouter)
router.use('/size', sizeRouter)
router.use('/color', colorRouter)
router.use('/order', orderRouter)
router.use('/cart', cartRouter)
router.post('/register', register)
router.post('/login', login)

export default router