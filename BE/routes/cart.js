import { Router } from "express";

import {
  addItemToCart,
  decreaseProductQuantity,
  getCartByUserId,
  increaseProductQuantity,
  removeFromCart,
  updateProductQuantity,
} from "../controllers/cart.js";

const cartRouter = Router();
cartRouter.get("/:userId", getCartByUserId);
cartRouter.post("/add-to-cart", addItemToCart);
cartRouter.put("/update-product-quantity", updateProductQuantity);
cartRouter.post("/remove-cart", removeFromCart);
cartRouter.post("/increase", increaseProductQuantity)
cartRouter.post("/decrease", decreaseProductQuantity)

export default cartRouter;
