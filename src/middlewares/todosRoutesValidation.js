const {body, query, param ,header, check} = require ("express-validator")

class todosRoutesValidation{
    validateBody = [
        body('title').notEmpty().isString().withMessage("Данные должны передаваться в виде строки"),
        body('isCompleted').notEmpty().isBoolean().withMessage("Data type boolean expected")
    ];
    validateTitleBody = [
        body('title').notEmpty().withMessage("Поле title не должно быть пустым").isString().withMessage("Данные должны передаваться в виде строки"),
    
    ];
  
    validateParam = [
        param('id').isLength({min:10}).isString().withMessage("Ожидается строка").not().isEmail()
    ]
    validateQuery = [
        query('url').isURL().withMessage("Ожидается url")
    ]
    validateHeader =[
        header("Content-Type").equals("application/json").withMessage("Ожидается json")
    ]

}




module.exports = new todosRoutesValidation()