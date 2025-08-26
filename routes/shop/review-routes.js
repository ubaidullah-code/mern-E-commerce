import express from "express";

import {
  addProductReview,
  getProductReviews,
} from "../../controllers/shop/product-review-controller.js";

const reviewRouter = express.Router();

reviewRouter.post("/add", addProductReview);
reviewRouter.get("/:productId", getProductReviews);

export default reviewRouter;