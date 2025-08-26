import express from "express";

import {
  addAddress,
  fetchAllAddress,
  editAddress,
  deleteAddress,
} from "../../controllers/shop/address-controller.js";

const addressRouter = express.Router();

addressRouter.post("/add", addAddress);
addressRouter.get("/get/:userId", fetchAllAddress);
addressRouter.delete("/delete/:userId/:addressId", deleteAddress);
addressRouter.put("/update/:userId/:addressId", editAddress);

export default addressRouter