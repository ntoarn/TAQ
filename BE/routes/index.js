import { Router } from "express";
import productRouter from "./product.js";
import categoryRouter from "./category.js";
import { login } from './../controllers/login.js';
import { register } from './../controllers/register.js';

const router = Router();
router.use('/products', productRouter)
router.use('/categories', categoryRouter)
router.post('/register', register)
router.post('/login', login)

export default router