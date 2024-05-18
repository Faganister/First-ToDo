const todosServices = require("../services/todosServices")
const { validationResult } = require ('express-validator')
const fileHelper = require("../helpers/fileHelper")
class todosControllers{
    async getTasks(req,res){
        const { sort } = req.query
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const tasks = await todosServices.getTasks()
        res.send(fileHelper.sortByQuery( sort, tasks ))
    }
    async createTask(req,res){   
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const result = await todosServices.createTask(req.body, req.userId)
        res.send(`Task with id ${result} has been created`)
        
    }
    async editTaskTitle(req,res){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const result = await todosServices.updateTaskTitle(req.body, req.params.id)
        if(!result){
            return res.status(400).json({ message: "Task not founded"})
        }
        res.send(`Task title ${JSON.stringify(req.body.title)} has been updated`)

    }
    async editTaskCompletness(req,res){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(404).json({ errors: errors.array() });
        }
        const result = await todosServices.updateTaskCompletness(req.params.id)
        if(!result){
            return res.status(404).json({ message: "Task not founded"})
        }
        res.send(`Todo status has been updated`)

    }
    async deleteTask(req,res){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        if (await todosServices.deleteTask(req.params.id)){
        res.send("Task deleted successfully")
        }else{
            return res.status(404).json( { task: "task not founded"})
        }
    }
}



module.exports = new todosControllers()