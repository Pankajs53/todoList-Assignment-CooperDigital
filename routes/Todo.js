const express = require("express")
const router = express.Router()

const {createTodo,getTodos, getTodoById, deleteTodo, updateTodo} = require("../controller/Todo");

// middelware : when request will hit the add api the request will first go in auth function which will add user id in req body from token then it will go in 2nd function to add new todo
const {auth} = require("../middleware/auth");

router.use(auth);

// Route for user signup
router.post("/add", createTodo);

// get all todos of an user
router.get("/getAll",getTodos);

// get todo by id
router.get("/:id",getTodoById) 

router.delete("/:id",deleteTodo)

router.put("/update/:id",updateTodo);


module.exports = router