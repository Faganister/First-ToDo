const userServices = require("../services/userServices")
const bcrypt = require("bcrypt");
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

            const result = await userServices.createUser({ username, email, password: hashedPassword })
            res.status(200).json({ result })
        }catch (error){
            console.error(error)
            res.status(500).json({ message: "Ошибка при регистрации пользователя"})
        }
    }
    async login(req,res){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try{
            const { email, password} = req.body
            const user = await userServices.findUserByEmail(email)
            if (!user){
                return res
                .status(401)
                .json({message: "Неверный логин или пароль"})
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
              return res.status(401).json({ message: "Неверный email или пароль" });
            }
            console.log(user);
            const token = jwt.sign({ userId: user._id }, process.env.Secret_key, { expiresIn: "1h" });
            res.json({ token });

        }catch (error){
            console.error(error)
            res.status(500).json({ message: "Ошибка при регистрации пользователя"})
        }
    }
}

module.exports = new UserControllers()
