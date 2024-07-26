import { Router } from "express";
import {
  createCategory,
  getAllCategory,
  getCategoryById,
  removeCategory,
  updateCategory,
} from "../controllers/category.js";

const categoryRouter = Router();
categoryRouter.get("/", getAllCategory);
categoryRouter.post("/", createCategory);
categoryRouter.get("/:id", getCategoryById);
categoryRouter.patch("/:id", updateCategory);
categoryRouter.delete("/:id", removeCategory);
export default categoryRouter;
