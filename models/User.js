import mongoose from "mongoose"

const userSechema = new mongoose.Schema({

    username :{
        type: String,
    },
    email : {
        type: String,
        required : true,
        unqiue : true
    },
    password : {
        type : String,
        required : true,
        
    },
    role : {
        type : String,
        default : "user",
    }

})

export const User = mongoose.model("User", userSechema)

