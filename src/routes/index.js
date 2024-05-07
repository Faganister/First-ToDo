const express = require("express")
const router = express.Router()

const todosRoutes = require("./todosRoutes")
// const loginRoutes = require("./loginRoutes")
// const registrationRoutes = require("./registrationRoutes")

router.use("/todos", todosRoutes)
// router.use("/login", loginRoutes)
// router.use("/register", registrationRoutes)

module.exports = router