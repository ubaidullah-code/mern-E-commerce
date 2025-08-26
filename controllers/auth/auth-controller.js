
import bcrypt from "bcryptjs"; 
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { User } from '../../models/User.js'
dotenv.config()


const SECRET_TOKEN = process.env.SECRET_TOKEN

export const registerUser =  async(req , res)=>{

    let {username, email , password} = req.body;

    email = email.toLowerCase();

    if(!username || !email || !password){
        res.status(400).send({ success: false, message : "Required perameter is Missing"})
        return;
    }
     try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const newUser = new User({
            
            password: hash
        });
   const signedUpUser = await newUser.save();
        return res.status(201).json({  success: true, message: "User Register successfully", user: signedUpUser });
    } catch (error) {
        console.log("error", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

// login
export const loginUser = async (req, res) => {
    let { email, password } = req.body;
    email = email.toLowerCase();

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(400).json({  success: false, message: "User doesn't exist" });
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: "Password is incorrect" });
        }

        const token = jwt.sign({
            id: existingUser._id,
            username : existingUser.username,
            role : existingUser.role,
            email: existingUser.email,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 // 1 day
        }, SECRET_TOKEN);

        res.cookie("Token", token, {
            httpOnly: true,
            maxAge: 86400000, // 1 day
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
        });

        return res.status(200).json({
             success: true,
            message: "Login successful",
            user: {
                id: existingUser._id,
                role : existingUser.role,
                email: existingUser.email,
                username : existingUser.username
                
            }
        });
    } catch (error) {
        console.log("error", error);
        return res.status(500).json({  success: false, message: "Internal server error" });
    }
}

// logout
export const logoutUser = (req, res) => {
  res.clearCookie("Token").json({
    success: true,
    message: "Logged out successfully!",
  });
};

//middleware

export const middleware =  (req, res, next) => {
   

    const token = req.cookies.Token; // Case-sensitive

    if (!token) {
        return res.status(401).send({ message: "Unauthorized access" });
    }

    try {
        jwt.verify(token, SECRET_TOKEN, (err, decoded) => {
            if (err) {
                return res.status(401).send({ success: false, message: "Invalid or expired token" });
            }

            const now = Math.floor(Date.now() / 1000);
            if (decoded.exp < now) {
                res.clearCookie("Token", {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
                });
                return res.status(401).send({  success: false, message: "Token expired" });
            }
            req.user = decoded;
            req.token = decoded; 
            next();
        });
    } catch (error) {
        console.log("error", error);
        return res.status(500).send({ success: false, message: "Internal server error" });
    }
}