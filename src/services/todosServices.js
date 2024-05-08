const fs = require('fs');
const { v4:uuidv4 } = require('uuid')

const fileHelper = require('../helpers/fileHelper');
class todosServices{
    async getUsers(){
        return await fileHelper.readFile("users.json")
    }
    async createUser(userData){
      const result = await fileHelper.readFile("users.json")
      result.push({...userData, id: uuidv4()}) 
      return await fileHelper.writeFile("users.json", result)
    }
    
    async updateUser(newUserData, userId){
    
      const result = await fileHelper.readFile("users.json");
      const userToUpdateIndex = result.findIndex(item => item.id == userId)
      if(userToUpdateIndex>=0){
        result.splice(userToUpdateIndex,1,{...newUserData, id:userId})
        return await fileHelper.writeFile("users.json", result)
      }
    }
    async deleteUser(userId){
      const userArray = await fileHelper.readFile("users.json");
      const userToDeleteIndex = userArray.findIndex(item => item.id == userId)
      if(userToDeleteIndex>=0){
        userArray.splice(userToDeleteIndex,1)
        return await fileHelper.writeFile("users.json", userArray)
      }
    }
    
}

module.exports = new todosServices()