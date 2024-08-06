import { Router } from "express";
import {
  createProduct,
  getAllProduct,
  getProductById,
  getProductsByCategory,
  removeProduct,
  updateProduct,
} from "../controllers/product.js";
import { checkAuth } from "../middlewares/checkAuth.js";
import { checkIsAdmin } from "../middlewares/checkIsAuth.js";

const productRouter = Router();
productRouter.get("/", getAllProduct);
productRouter.get("/:id", getProductById);
productRouter.get('/category/:categoryId', getProductsByCategory)

productRouter.use("/", checkAuth, checkIsAdmin); 
productRouter.post("/", createProduct);
productRouter.patch("/:id", updateProduct);
productRouter.delete("/:id", removeProduct);
export default productRouter;
