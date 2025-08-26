
import mongoose from "mongoose";

const productSechema = new mongoose.Schema({
    
    image : String,
    title : String,
    description : String,
    category : String,
    price : Number,
    brand : String,
    salePrice : Number,
    totalStock : Number,
    averageReview : Number
    
},
 { timestamps : true}
)

export const Product = mongoose.model("Product", productSechema)