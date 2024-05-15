const express = require("express")
const router = express.Router()

const validation = require("../middlewares/userRoutesValidation")
const userControllers = require("../controllers/userControllers")


/**
 * @swagger
 * /api/users/login:
 *    post:
 *      summary: Авторизовать пользователя
 *      description: Авторизация пользователя по email и паролю
 *      tags:
 *        - Users
 *      requestBody:
 *        $ref: "#/components/requestBodies/Users"
 *      responses:
 *        200:
 *          description: Bearer token
 * components:
 *   requestBodies:
 *     Users:
 *       description: Модель пользователя
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: vanyafurman13@gmail.com
 *                 description: User email
 *               password:
 *                 type: string
 *                 example: createSomething123
 *                 description: Пароль пользователя 
 */
router.post("/login", validation.validateHeader, validation.validateLoginBody, userControllers.login)

/**
 * @swagger
 * /api/users/register:
 *    post:
 *      summary: Зарегистрировать юзера
 *      description: Зарегистрировать пользователя с полями password, email, username
 *      tags:
 *        - Users
 *      requestBody:
 *        $ref: "#/components/requestBodies/Users"
 *      responses:
 *        200:
 *          description: Таска успешно создана
 * components:
 *   requestBodies:
 *     Users:
 *       description: Модель пользователя
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: vanyafurman13@gmail.com
 *                 description: User email
 *               password:
 *                 type: string
 *                 example: createSomething123
 *                 description: Пароль пользователя 
 *               username:
 *                 type: string
 *                 example: faganister
 *                 description: Ник пользователя
 */
router.post("/register", validation.validateHeader, validation.validateBody, userControllers.createUser)



module.exports = router