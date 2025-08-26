import express from "express";



import { addProduct, deleteProduct, editProduct, fetchAllProducts, handleImageUpload } from "../../controllers/admin/products-controllers.js";
import { upload   } from "../../helpers/cloudinary.js";

const productRouter = express.Router();

productRouter.post("/upload-image", upload.single("my_file"), handleImageUpload);
productRouter.post("/add", addProduct);
productRouter.put("/edit/:id", editProduct);
productRouter.delete("/delete/:id", deleteProduct);
productRouter.get("/get", fetchAllProducts);

 export default  productRouter;