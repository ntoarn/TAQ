import { Router } from "express";
import {
  createProduct,
  getAllProduct,
  getProductById,
  getProductsByCategory,
  getProductsByTitle,
  removeProduct,
  updateProduct,
  getProductsByPriceRange,
} from "../controllers/product.js";
import { checkAuth } from "../middlewares/checkAuth.js";
import { checkIsAdmin } from "../middlewares/checkIsAuth.js";

const productRouter = Router();
productRouter.get("/", getAllProduct);
productRouter.get("/:id", getProductById);
productRouter.get("/category/:categoryId", getProductsByCategory);

productRouter.get("/search/:key", getProductsByTitle);
productRouter.get("/price-range/:key", getProductsByPriceRange);
productRouter.use("/", checkAuth, checkIsAdmin);
productRouter.post("/", createProduct);
productRouter.patch("/:id", updateProduct);
productRouter.delete("/:id", removeProduct);
export default productRouter;
