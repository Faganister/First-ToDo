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
      const isExist = fileHelper.findByData("users.json", email)
      if(isExist){}
    }
    
    
}

module.exports = new UserServices()