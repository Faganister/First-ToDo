const fs = require('fs');
const { v4:uuidv4 } = require('uuid')

const fileHelper = require('../helpers/fileHelper');
class todosServices{
    async getTasks(){
      return await fileHelper.readFile("todos.json")
    }
    async createTask(taskData, userIdentificator){
      const result = await fileHelper.readFile("todos.json")
      const idUuidv4 = uuidv4()
      result.push({  ...taskData, id:idUuidv4, userId: userIdentificator}) 
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
    async updateTaskCompletness(taskId){
      const result = await fileHelper.readFile("todos.json");
      const taskToUpdateIndex = result.findIndex(item => item.id == taskId)
      if(taskToUpdateIndex>=0){
        const task = result.splice(taskToUpdateIndex,1)[0]
        result.push({...task, isCompleted:!task.isCompleted})
        return await fileHelper.writeFile("todos.json", result)
      }
    }
    async deleteTask(taskId){
      const todosArray = await fileHelper.readFile("todos.json");
      const taskToDeleteIndex = todosArray.findIndex(item => item.id == taskId)
      if(taskToDeleteIndex>=0){
        todosArray.splice(taskToDeleteIndex,1)
        return await fileHelper.writeFile("todos.json", todosArray)
      }
    }
    
}

module.exports = new todosServices()