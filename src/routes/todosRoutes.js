const express = require("express")
const router = express.Router()

const todosControllers = require("../controllers/todosControllers")
const validation = require("../middlewares/todosRoutesValidation")
const authenticateToken = require("../middlewares/authenticateToken")

router.get("/" ,authenticateToken,  validation.validateHeader, todosControllers.getTasks)

router.post("/",  authenticateToken,  validation.validateHeader, validation.validateBody, todosControllers.createTask)

router.patch("/:id",authenticateToken, validation.validateBody, todosControllers.editTaskTitle)

router.patch("/:id/isCompleted",authenticateToken, validation.validateHeader, todosControllers.editTaskCompletness)

router.delete("/:id", authenticateToken, validation.validateHeader, todosControllers.deleteTask)

module.exports = router