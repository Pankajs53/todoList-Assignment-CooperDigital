const Joi = require('joi');

const todoSchema = Joi.object({
    title:Joi.string().min(4).max(25).required().trim(),
    description: Joi.string().max(300).optional(),
    status: Joi.string().valid("pending", "inprogress", "completed").default("pending"),
    priority: Joi.string().valid("low", "medium", "high").default("medium"),
    dueDate: Joi.date().greater("now").optional(),
})

module.exports = {todoSchema};