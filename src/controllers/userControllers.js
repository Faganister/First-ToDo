const userServices = require("../services/userServices")
const bcrypt = require("bcrypt");
// const User = require("./models/User"); // Модель пользователя
const jwt = require("jsonwebtoken");
const { validationResult } = require ('express-validator')
class UserControllers{
    async createUser(req,res){   
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try{
            const {username, email, password} = req.body
            const existingUser = await userServices.findUserByEmail(email)
            if (existingUser){
                return res
                .status(400)
                .json({message: "Пользователь с таким email уже существует"})
            }
            const saltRounds = 10
            const hashedPassword = await bcrypt.hash(password, saltRounds)

            const newUser = new User ({ username, email, password: hashedPassword })
            res.status(200).json({  newUser })
        }catch (error){
            console.error(error)
            res.status(500).json({ message: "Ошибка при регистрации пользователя"})
        }
        const result = await userServices.createUser(req.body)
        res.send(`User ${JSON.stringify(req.body)} has been created`)
        
    }
}

module.exports = new UserControllers()
