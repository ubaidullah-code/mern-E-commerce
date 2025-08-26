import express from "express";
import { getAllOrdersOfAllUsers, getOrderDetailsForAdmin, updateOrderStatus } from "../../controllers/admin/order-controllers.js";



const OrderRouter = express.Router();

OrderRouter.get("/get", getAllOrdersOfAllUsers);
OrderRouter.get("/details/:id", getOrderDetailsForAdmin);
OrderRouter.put("/update/:id", updateOrderStatus);

export default OrderRouter;