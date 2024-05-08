const todosServices = require("../services/todosServices")
const { validationResult } = require('express-validator')
class todosControllers{
    async getTasks(req,res){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const users = await todosServices.getUsers()
        res.send(users)
    }
    async createTask(req,res){   
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        res.send(`User ${JSON.stringify(req.body)} has been created`)
        const result = await todosServices.createUser(req.body)
    }
    async editTaskTitle(req,res){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const result = await todosServices.updateUser(req.body, req.params.id)
        res.send(`User ${JSON.stringify(req.body)} has been updated`)

    }
    async editTaskComplited(req,res){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const result = await todosServices.updateUser(req.body, req.params.id)
        res.send(`User ${JSON.stringify(req.body)} has been updated`)

    }
    async deleteTask(req,res){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        await todosServices.deleteUser(req.params.id)
        res.send("User deleted successfully")
    }
}



module.exports = new todosControllers()