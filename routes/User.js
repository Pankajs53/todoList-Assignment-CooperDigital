const express = require("express")
const router = express.Router()

const {signUp,login} = require("../controller/Auth");


// Route for user signup
router.post("/signup", signUp)

// Route for user login
router.post("/login", login)


module.exports = router