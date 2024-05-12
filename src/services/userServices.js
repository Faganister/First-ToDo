const fs = require('fs');
const { v4:uuidv4 } = require('uuid')

const fileHelper = require('../helpers/fileHelper');
class UserServices{

    async createUser(userData){
      const result = await fileHelper.readFile("users.json")
      result.push({...userData, id: uuidv4()}) 
      return await fileHelper.writeFile("users.json", result)
    }
    async findUserByEmail(email){
      return await fileHelper.findByEmail("users.json", email)
    }
    async getUsers(){ 
      return await fileHelper.readFile("users.json")
  }
    
}

module.exports = new UserServices()