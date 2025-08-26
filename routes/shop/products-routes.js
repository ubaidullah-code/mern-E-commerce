import express from "express";

import {
  getFilteredProducts,
  getProductDetails,
} from "../../controllers/shop/products-controller.js";

const productsRouter = express.Router();

productsRouter.get("/get", getFilteredProducts);
productsRouter.get("/get/:id", getProductDetails);

export default  productsRouter;