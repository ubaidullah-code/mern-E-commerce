import express from "express";

import { searchProducts } from "../../controllers/shop/search-controller.js";

const seacrhRouter = express.Router();

seacrhRouter.get("/:keyword", searchProducts);

export default seacrhRouter;