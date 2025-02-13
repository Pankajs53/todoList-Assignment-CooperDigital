const mongoose = require("mongoose");
const bycrpt = require("bcrypt");

const userSchema = new mongoose.Schema(
    {
        firstName:{
            type:String,
            required:true,
            trim:true,
        },
        lastName:{
            type:String,
            required:true,
            trim:true,    
        },
        email:{
            type:String,
            required:true,
            unique:true,
            trim:true,
            match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"]
        },
        password:{
            type:String,
            required:true,
        },
        token:{
            type:String,
        },
        resetPasswordExpires:{
            type:Date,
        }
    },
    {timestamps:true}
)

module.exports = mongoose.model("User",userSchema);