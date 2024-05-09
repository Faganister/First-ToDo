const todosServices = require("../services/todosServices")
const { validationResult } = require ('express-validator')
class todosControllers{
    async getTasks(req,res){
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //     return res.status(400).json({ errors: errors.array() });
        // }
        const tasks = await todosServices.getTasks()
        res.send(tasks)
    }
    async createTask(req,res){   
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //     return res.status(400).json({ errors: errors.array() });
        // }
        const result = await todosServices.createTask(req.body)
        res.send(`Task with id ${result} has been created`)
        
    }
    async editTaskTitle(req,res){
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //     return res.status(400).json({ errors: errors.array() });
        // }
        const result = await todosServices.updateTaskTitle(req.body, req.params.id)
        res.send(`Task title ${JSON.stringify(req.body.title)} has been updated`)

    }
    async editTaskComplitness(req,res){
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //     return res.status(400).json({ errors: errors.array() });
        // }
        const result = await todosServices.updateTaskComplitness(req.body.isCompleted, req.params.id)
        res.send(`User ${JSON.stringify(req.body)} has been updated`)

    }
    async deleteTask(req,res){
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //     return res.status(400).json({ errors: errors.array() });
        // }
        await todosServices.deleteTask(req.params.id)
        res.send("Task deleted successfully")
    }
}



module.exports = new todosControllers()