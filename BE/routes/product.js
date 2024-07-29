import { Router } from "express";
import {
  createProduct,
  getAllProduct,
  getProductById,
  removeProduct,
  updateProduct,
} from "../controllers/product.js";
import { checkPermission } from "../middlewares/checkPermission.js";

const productRouter = Router();
productRouter.get("/", getAllProduct);
productRouter.post("/", createProduct);
productRouter.get("/:id", getProductById);
productRouter.patch("/:id", updateProduct);
productRouter.delete("/:id", removeProduct);
export default productRouter;
