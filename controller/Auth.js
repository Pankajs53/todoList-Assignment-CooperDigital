const User = require("../models/User");
const bycrpt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const {registrationSuccessEmail} = require("../templates/registrationSuccess");
require("dotenv").config();



const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false // Bypass self-signed certificate issue
    }
})

const mailSender = async(email,title,body) =>{
    console.log("Inside email sender");
    try{
        let info = await transporter.sendMail({
            from : 'TodoList || Pankaj - Singh',
            to:`${email}`,
            subject: `${title}`,
            html: `${body}`,
        })

        console.log(info);
        return info;

    }catch(error){
        console.log("Error in mail Sender");
        console.log(error.message);
    }
}

// sign up controller
exports.signUp = async(req,res) =>{
    try{
        const {firstName,lastName,email,password,confirmPassword} = req.body;
        console.log(req.body);
        if(!firstName || !lastName || !email || !password || !confirmPassword){
                return res.status(403).json({
                    success:false,
                    message:"All fields are required",
                })
        }
        
        // match the both password
        if(password!==confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Password and confrimPassword value does not match"
            })
        }

        // check if user already exist
        const existingUser = await User.findOne({email});
        if(existingUser){
            console.log("Already exist in database")
            return res.status(400).json({
                success:false,
                message:"User Already Registered",
            })
        }

        const hashedPassword = await bycrpt.hash(password,10); 
        const user = await User.create({
            firstName,
            lastName,
            email,
            password:hashedPassword,
        })

        // console.log("User is->",user);
        
        const emailBody = registrationSuccessEmail(email,firstName);
        await mailSender(email,"Welcome to TodoList App!",emailBody);
        

        return res.status(200).json({
            success:true,
            message:"SIGN UP SUCCESSFULLY -> USER REGISTERED",
            user,
        })

    }catch(error){
        console.log("ERROR IN SIGN UP->",error);
        return res.status(405).json({
            success:false,
            message:"ERROR IN SIGN UP",
        })
    }
}


exports.login = async(req,res) =>{
    try{
        console.log("Inside login controller");
        const {email,password} = req.body;
        console.log("email is",email,"password is->",password);
        // check if email or password is empty
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"ENTER DATA CAREFULLY"
            })
        }

        // check if present in DB
        const userExist = await User.findOne({email});
        console.log("USER EXIST",userExist);
        if(!userExist){
            return res.status(405).json({
                success:false,
                message:"User does not exits,plase sign up first"
            })
        }

        // compare the password
        if(await bycrpt.compare(password,userExist.password)){
            // create a jwt toke
            const payload = {
                email : userExist.email,
                id:userExist._id,
            }
            console.log("Payload is",payload);
            const token = jwt.sign(payload,process.env.JWT_SECRET , {
                expiresIn:"2h",
            });

            // Save token to user document in database
            userExist.token = token;
            userExist.password = undefined;

            const options = {
                // 3 days
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly:true,
            }

            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                // userExist,
                message:"Logged In Succesfully"
            })
        }else{
            return res.status(400).json({
                success:false,
                message:"Password is incorrect"
            })
        }
    }catch(error){
        console.log("ERROR IN LOGIN ->",error);
        return res.status(405).json({
            success:false,
            message:"ERROR IN LOGIN UP",
        }) 
    }
}