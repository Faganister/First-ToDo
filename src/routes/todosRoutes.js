const express = require("express")
const router = express.Router()

const todosControllers = require("../controllers/todosControllers")
const validation = require("../middlewares/todosRoutesValidation")
const authenticateToken = require("../middlewares/authenticateToken")

/**
 * @swagger
 * /api/todos:
 *   get:
 *     summary: Получить список тасок
 *     description: Получение списка тасок из базы данных с возможностью сортировки.
 *     tags:
 *       - Todos
 *     security:
 *       - bearerAuth: [] 
 *     parameters:
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Поле для сортировки тасок (например, "title" или "isActive").
 *     responses:
 *       200:
 *         description: Массив тасок
 * components:
 *   schemas:
 *     Todo:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           example: Закрыть 3-й чек-лист
 *         isActive:
 *           type: boolean
 *           example: false
 */

router.get("/" , authenticateToken, todosControllers.getTasks)

router.post("/",  authenticateToken,  validation.validateHeader, validation.validateBody, todosControllers.createTask)

router.patch("/:id",authenticateToken, validation.validateBody, todosControllers.editTaskTitle)

router.patch("/:id/isCompleted",authenticateToken, validation.validateHeader, todosControllers.editTaskCompletness)

/**
 * @swagger
 * /api/todos/{id}:
 *    delete:
 *      summary: Удалить таску
 *      description: Удаляет таску по id
 *      tags:
 *        - Todos
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Успешное удаление таски
 *        401:
 *          description: Пользователь не авторизован
 *        404:
 *          description: Таска с указанным идентификатором не найдена.
 *        400:
 *          description: Bad request. Id should be string
 */

router.delete("/:id",  validation.validateParam, todosControllers.deleteTask)

module.exports = router