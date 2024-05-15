const {body, query, param ,header} = require ("express-validator")

class UserRoutesValidation{
    validateBody = [
        body('email').isEmail().withMessage("Нужна @"),
        body('password').isLength({ min: 6 }).withMessage("At least 6 symbols and not equals email").not().equals(body("email")),
        body("username").isLength({min: 5}).withMessage("At least 5 symbols").isAlphanumeric().withMessage("only letters and numbers latin alphabet")
    ];
    validateLoginBody = [
        body('email').isEmail().withMessage("Нужна @"),
        body('password').isLength({ min: 6}).withMessage("At least 6 symbols and not equals email").not().equals(body("email")),
    ]
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
module.exports = new UserRoutesValidation()