import { OtpCheck } from "../../models/OtpFeature.js";
import { User } from "../../models/User.js";
import bcrypt from "bcryptjs";
import nodemailer from 'nodemailer';
import { customAlphabet } from "nanoid";
import dotenv from 'dotenv';
dotenv.config()



export const verifyEmail = async (req, res) => {
  let { email } = req.body;

  if (!email) {
    res.status(400).send({ success: false, message: "Required perameter is Missing" })
    return;
  }

  email = email.toLowerCase()

  try {
    const user = await User.findOne({ email: email });
    if (!user) return res.status(404).json({ message: "User not found" });

    /// generate otp
    let otp = customAlphabet('1234567890', 5)
    const customOtp = otp()
    //convert into hash 
    const salt = bcrypt.genSaltSync(10);
    const hashOtp = bcrypt.hashSync(customOtp, salt);


    // Remove previous OTP for this email (optional)
    await OtpCheck.deleteMany({ email });
    // create otp in DB
    await OtpCheck.create({ email, otp: hashOtp });


    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    // console.log("transporter", transporter)
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP is ${customOtp}. It expires in 10 minutes.`,
    });
     res.status(200).send({message: "send otp ", success : true})
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ message: "Internal server error" });

  }
}

export const verifyOtp = async (req, res) => {
  const { otp, email } = req.body;

  if (!otp || !email) {
    return res.status(400).json({ success: false, message: "Required parameter is missing" });
  }

  try {
    const otpRes = await OtpCheck.findOne({ email }).sort({ createdAt: -1 });

    if (!otpRes) {
      return res.status(404).json({ success: false, message: "No OTP found for this email" });
    }

    // Check if OTP expired (10 min)
    const otpAge = (Date.now() - new Date(otpRes.createdAt)) / 1000 / 60; // in minutes
    if (otpAge > 10) {
      return res.status(410).json({ success: false, message: "OTP has expired" });
    }

    // Compare entered OTP with stored hash
    const isOtpValid = await bcrypt.compare(otp, otpRes.otp);
    if (!isOtpValid) {
      return res.status(401).json({ success: false, message: "OTP is incorrect" });
    }

    return res.status(200).json({ success: true, message: "OTP verified successfully" });

  } catch (error) {
    console.error("Error verifying OTP:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedUser = await User.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.json({ success: true, message: "Password updated successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

