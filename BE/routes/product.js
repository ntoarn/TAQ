import { Router } from "express";
import {
  createProduct,
  getAllProduct,
  getProductById,
  getProductsByCategory,
  removeProduct,
  searchProducts,
  updateProduct
} from "../controllers/product.js";
import { checkAuth } from "../middlewares/checkAuth.js";
import { checkIsAdmin } from "../middlewares/checkIsAuth.js";

const productRouter = Router();

productRouter.get("/search", searchProducts);
productRouter.get("/", getAllProduct);
productRouter.get("/:id", getProductById);
productRouter.get("/category/:categoryId", getProductsByCategory);

// Các route cần xác thực
productRouter.use("/", checkAuth, checkIsAdmin);
productRouter.post("/", createProduct);
productRouter.patch("/:id", updateProduct);
productRouter.delete("/:id", removeProduct);

export default productRouter;
