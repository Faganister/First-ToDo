const express = require("express")
const router = express.Router()

const todosControllers = require("../controllers/todosControllers")
const validation = require("./todosRoutesValidation")

router.get("/", todosControllers.getTasks)

router.post("/", todosControllers.createTask)

router.patch("/:id", todosControllers.editTaskTitle)

router.patch("/:id/isCompleted", todosControllers.editTaskComplited)

router.delete("/:id", todosControllers.deleteTask)

module.exports = router