const Todo = require("../models/Todo");
const {todoSchema} = require("../utils/validation")

// add todo
// remove todo
// when get todo check current date and due date for each task and send a flag as expired or something

exports.createTodo = async(req,res)=>{
    try{
        // if user has token only then request will reach here
        // console.log("req body is -> " , req.body);
        const{error,value} = todoSchema.validate(req.body);
        if(error){
            return res.status(400).json({
                success: false,
                message: "Validation Error",
                errors: error.details.map((err) => err.message),
            });   
        }

        const { title, description, status, priority, dueDate} = value;

        // console.log("id is ",req.user.id);
        const newTodo = new Todo({
            title,
            description,
            status,
            priority,
            dueDate,
            userId:req.user.id,
        })

        await newTodo.save();

        return res.status(201).json({
            message: "Todo created successfully",
            success: true,
            data: newTodo,
        });

    }catch(error){
        console.log("Error in creating new todo ",error);
        return res.status(500).json({
            message:"Error creating Todo Task",
            success:false
        })
    }
}

exports.getTodos = async(req,res)=>{
    try{
        const userId = req.user.id;
        console.log("Feteching todos for user", userId);

        const todos = await Todo.find({userId});
        console.log("All todos are",todos);

        return res.status(200).json({
            success: true,
            message: "Fetched user todos successfully",
            data: todos,
        });

    }catch(error){
        console.error("Error fetching todos:", error);
        return res.status(500).json({
          success: false,
          message: "Error fetching todos",
        });
    }
}

exports.getTodoById = async(req,res)=>{
    try{
        const {id} = req.params;
        const todo = await Todo.findById(id);
        if(!todo){
            return res.status(404).json({
                success: false,
                message: "Todo not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Todo fetched successfully",
            data: todo,
        });

    }catch(error){
        console.error("Error fetching todo:", error);
        return res.status(500).json({
            success: false,
            message: "Error fetching todo",
        });
    }
}

// delete a todo
exports.deleteTodo = async (req, res) => {
    try {
        const { id } = req.params; 

        // Find and delete the Todo item, ensuring the user owns it
        const deletedTodo = await Todo.findOneAndDelete({ _id: id, userId: req.user.id });

        if (!deletedTodo) {
            return res.status(404).json({
                success: false,
                message: "Todo not found or you don't have permission to delete it",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Todo deleted successfully",
        });

    } catch (error) {
        console.error("Error deleting todo:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

// update Todo
exports.updateTodo = async(req,res)=>{
    try{
        const {id} = req.params;
        const userId = req.user.id;
        console.log(userId);

        const todoUpdates = req.body;

        // if no update made then return
        if(Object.keys(todoUpdates).length === 0){
            return res.status(400).json({
                success: false,
                message: "No updates provided",
            });
        }

        // console.log("Here",todoUpdates);

        const updatedTodo = await Todo.findOneAndUpdate(
            {_id:id,userId:userId},
            { $set:todoUpdates},
            {new:true}
        )

        if (!updatedTodo) {
            return res.status(404).json({
                success: false,
                message: "Todo not found or you don't have permission to update it",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Todo updated successfully",
            data: updatedTodo,
        });

    }catch(error){
        console.log("Error in updateTodo Function");
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

