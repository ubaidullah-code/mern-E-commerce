import express from 'express';
import cors from 'cors';
import path from "path"
import mongoose from 'mongoose';
import authRouter from './routes/auth/auth-route.js';

import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import productRouter from './routes/admin/products-routes.js';
import OrderRouter from './routes/admin/order-routes.js';
import productsRouter from './routes/shop/products-routes.js';
import cartRouter from './routes/shop/cart-routes.js';
import addressRouter from './routes/shop/address-routes.js';
import orderRouter from './routes/shop/order-routes.js';
import reviewRouter from './routes/shop/review-routes.js';
import seacrhRouter from './routes/shop/search-routes.js';
import featureRouter from './routes/common/feature-routes.js';
import optRouter from './routes/auth/otp-routes.js';

const app = express();
const PORT = process.env.PORT || 5000;
dotenv.config();
app.use(cors({
    origin: ['http://localhost:5173',  'https://e-commerce-74.netlify.app'],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1', authRouter)
app.use('/api/forget', optRouter);
app.use('/api/admin/products' , productRouter)
app.use('/api/admin/orders', OrderRouter )

app.use("/api/shop/products", productsRouter);
app.use("/api/shop/cart", cartRouter);
app.use("/api/shop/address", addressRouter);
app.use("/api/shop/order", orderRouter);
app.use("/api/shop/search", seacrhRouter);

app.use("/api/shop/review", reviewRouter);

app.use("/api/common/feature", featureRouter);
mongoose.connect(process.env.DATABASE_URI);
mongoose.connection.on('connected',()=> console.log("mongodb is connected"))
mongoose.connection.off('error',(error)=> console.log("mongodb is not connected", error)) 
app.get("/", (req, res) => {
  res.send("Hello from Express on Vercel!");
});

app.listen(PORT, ()=>{
    console.log(`Server is Running ${PORT}`);
})