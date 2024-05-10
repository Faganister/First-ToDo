const {body, query, param ,header} = require ("express-validator")

class UserRoutesValidation{
    validateBody = [
        body('email').isEmail().withMessage("Нужна @"),
        body('password').isLength({ min: 6, max:15 }).withMessage("At least 6 symbols and not equals email").not().equals(body("email")),
        body("age").isInt().custom(isAgeValid).withMessage("Число должно быть integer от 18 до 65"),
        body("course").optional().trim().isArray().withMessage("Ожидается массив")
    ];
  
    validateParam = [
        param('id').isLength({min:10}).not().isEmail()
    ]
    validateQuery = [
        query('url').isURL().withMessage("Ожидается url")
    ]
    validateHeader =[
        header("Content-Type").equals("application/json").withMessage("Ожидается json")
    ]
}
const isAgeValid = (value) => {
    if (typeof value === "number" && value > 18 && value<65) {
      return true
    }
    return false
}



module.exports = new UserRoutesValidation()