import express from "express";

import {
  addToCart,
  fetchCartItems,
  deleteCartItem,
  updateCartItemQty,
} from "../../controllers/shop/cart-controller.js";

const cartRouter = express.Router();

cartRouter.post("/add", addToCart);
cartRouter.get("/get/:userId", fetchCartItems);
cartRouter.put("/update-cart", updateCartItemQty);
cartRouter.delete("/:userId/:productId", deleteCartItem);

export default cartRouter;