
// models/Otp.js
import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true }, // store hashed OTP
  createdAt: { type: Date, default: Date.now, expires: 600 } // auto-delete after 10 mins
});

export const OtpCheck =  mongoose.model("Otps", otpSchema);
