const fs = require('fs');
const { v4:uuidv4 } = require('uuid')

const fileHelper = require('../helpers/fileHelper');
class todosServices{
    async getTasks(){
      return await fileHelper.readFile("todos.json")
    }
    async createTask(taskData){
      const result = await fileHelper.readFile("todos.json")
      const idUuidv4 = uuidv4()
      result.push({  ...taskData, id:idUuidv4,}) 
      await fileHelper.writeFile("todos.json", result)
      return idUuidv4
    }
    
    async updateTaskTitle(newTaskData, taskId){
      const result = await fileHelper.readFile("todos.json");
      const taskToUpdateIndex = result.findIndex(item => item.id == taskId)
      if(taskToUpdateIndex>=0){
        const task = result.splice(taskToUpdateIndex,1)[0]
        result.push({...task, title:newTaskData.title})
        return await fileHelper.writeFile("todos.json", result)
      }
    }
    async updateTaskComplitness(isCompleted, taskId){
      console.log(isCompleted);
      const result = await fileHelper.readFile("todos.json");
      const taskToUpdateIndex = result.findIndex(item => item.id == taskId)
      if(taskToUpdateIndex>=0){
        const task = result.splice(taskToUpdateIndex,1)[0]
        result.push({...task, isComplited:!task.isComplited})
        return await fileHelper.writeFile("todos.json", result)
      }
    }
    async deleteTask(taskId){
      const todosArray = await fileHelper.readFile("todos.json");
      const taskToDeleteIndex = userArray.findIndex(item => item.id == taskId)
      if(taskToDeleteIndex>=0){
        todosArray.splice(userToDeleteIndex,1)
        return await fileHelper.writeFile("todos.json", userArray)
      }
    }
    
}

module.exports = new todosServices()