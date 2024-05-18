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
 *         description: Поле для сортировки тасок (например, "title" или "isCompleted").
 *     responses:
 *       200:
 *         description: Массив тасок
 *       401:
 *         description: Пользователь не авторизован
 *       403:
 *         description: Истек срок токена или неправильный токен
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

/**
 * @swagger
 * /api/todos:
 *    post:
 *      summary: Создать новую таску
 *      description: С полями title и isCompleted
 *      tags:
 *        - Todos
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        $ref: "#/components/requestBodies/Todos"
 *      responses:
 *        200:
 *          description: Id созданной таски
 *        401:
 *          description: Пользователь не авторизован
 *        403:
 *          description: Истек срок токена или неправильный токен
 *        400:
 *          description: Проблемы с валидацией
 * components:
 *   requestBodies:
 *     Todos:
 *       description: Свойства таски, которые были добавлены.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Закрыть 3-й чек-лист
 *                 description: Название таски
 *               isCompleted:
 *                 type: boolean
 *                 example: false
 *                 description: Завершена ли таска
 */
router.post("/",  authenticateToken,  validation.validateHeader, validation.validateBody, todosControllers.createTask)
/**
 * @swagger
 * /api/todos/{id}:
 *   patch:
 *     summary: Изменить title таски
 *     description: Обновляет часть данных таски по его ID.
 *     tags:
 *        - Todos
 *     security:
 *        - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Идентификатор таски.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               isCompleted:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Данные таски успешно обновлены.
 *       404:
 *         description: Таска не найдена
 *       401:
 *         description: Пользователь не авторизован
 *       403:
 *         description: Истек срок токена или неправильный токен
 *       400:
 *         description: Проблемы с валидацией
 */
router.patch("/:id", authenticateToken, validation.validateBody, todosControllers.editTaskTitle)
/**
 * @swagger
 * /api/todos/{id}/isCompleted:
 *   patch:
 *     summary: Изменить статус таски
 *     description: Обновляет часть данных таски по его ID.
 *     tags:
 *        - Todos
 *     security:
 *        - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Идентификатор таски.
 *     responses:
 *       200:
 *         description: Данные таски успешно обновлены.
 *       404:
 *         description: Таска не найдена
 *       401:
 *         description: Пользователь не авторизован
 *       403:
 *         description: Истек срок токена или неправильный токен
 *       400:
 *         description: Проблемы с валидацией
 */
router.patch("/:id/isCompleted",authenticateToken, todosControllers.editTaskCompletness)

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