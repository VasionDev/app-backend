// external import
const { check, validationResult } = require("express-validator");

// quiz/question form validator
const quizFormValidator = [
    check('title')
        .isLength({min: 1})
        .withMessage('name must not be empty.')
        .trim(),
    check('category')
        .isLength({min: 1})
        .withMessage('Category must not be empty.'),
    check('location')
        .isLength({min: 1})
        .withMessage('Location must not be empty.')
]

// quiz/question form validation handler
const quizValidationHandler = (req, res, next) => {
    const errors = validationResult(req)
    const mappedErrors = errors.mapped()
    if(Object.keys(mappedErrors).length === 0 ) {
        next()
    }else {
        res.status(500).json({
            errors: mappedErrors
        })
    }
}

module.exports = {
    quizFormValidator,
    quizValidationHandler
}