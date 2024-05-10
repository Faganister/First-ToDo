const express = require("express")
const router = express.Router()

const todosRoutes = require("./todosRoutes")
const userRoutes = require("./userRoutes")


router.use("/todos", todosRoutes)
router.use("/users", userRoutes)


module.exports = router