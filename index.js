const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 4000;

const database = require("./config/database");
const cookieParser = require("cookie-parser");

// Routes
const userRoutes = require("./routes/User");
const todoRoutes = require("./routes/Todo");

// parese or handle json data
app.use(express.json());
app.use(cookieParser());

database.dbConnect();


// routes
app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/todo",todoRoutes);


app.get("/",(req,res)=>{
    res.send("Hello World");
})


app.listen(PORT,()=>{
    console.log(`Server is listing on port ${PORT}`)
})