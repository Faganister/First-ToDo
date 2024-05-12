const express = require("express")
const router = express.Router()

const validation = require("../middlewares/userRoutesValidation")
const userControllers = require("../controllers/userControllers")
const authenticateToken = require("../middlewares/authenticateToken")

router.post("/login", validation.validateHeader, validation.validateLoginBody, userControllers.login)
router.post("/register", validation.validateHeader, validation.validateBody, userControllers.createUser)
router.get("/", authenticateToken, userControllers.getUsers)

module.exports = router