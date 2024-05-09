const router = express.Router()

const todosControllers = require("../controllers/loginControllers")

router.post('/', loginControllers.login)


module.exports = router