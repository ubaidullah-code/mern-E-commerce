
import express from "express"

import { loginUser } from "../../controllers/auth/auth-controller.js"
import { registerUser } from "../../controllers/auth/auth-controller.js"
import { logoutUser } from "../../controllers/auth/auth-controller.js"
import { middleware } from "../../controllers/auth/auth-controller.js"

const authRouter = express.Router()

authRouter.post('/register' , registerUser);
authRouter.post("/login",loginUser);
authRouter.post('/logout', logoutUser )
authRouter.get('/check-auth', middleware ,(req ,res)=>{
    const user = req.token
    res.status(200).send({
        message : "Authenticated User",
        user,
    })
})

export default authRouter;