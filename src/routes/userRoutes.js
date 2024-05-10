const express = require("express")
const router = express.Router()
const userControllers = require("../controllers/userControllers")

router.post("/login", userControllers.createUser)
router.post("/register", userControllers.createUser)


module.exports = router