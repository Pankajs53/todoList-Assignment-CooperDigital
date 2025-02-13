const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = () =>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("CONNECTED WITH DATABASE");
    })
    .catch((error)=>{
        console.log("Error in Connecting with database");
        console.error(error);
        process.exit(1);
    })
}

module.exports = {dbConnect};