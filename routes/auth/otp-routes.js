

import express from "express";
import { updatePassword, verifyEmail, verifyOtp } from "../../controllers/auth/opt-controller.js";

const optRouter = express.Router();

optRouter.post('/verify-email', verifyEmail);
optRouter.post('/verify-otp', verifyOtp)
optRouter.post('/update-password', updatePassword)





export default optRouter;