// external import
const { check, validationResult } = require("express-validator");

// login form validator
const loginFormValidator = [
    check('username')
        .isLength({min: 1})
        .withMessage('Email or Mobile number must not be empty'),
    check('password')
        .isLength({min: 1})
        .withMessage('Password must not be empty')
]

// login form validation handler
const loginFormValidationHandler = (req, res, next) => {
    const errors = validationResult(req)
    const mappedErrors = errors.mapped()
    if(Object.keys(mappedErrors).length === 0 ) {
        next()
    }else {
        if(res.locals.html) {
            res.render('index', {
                data: {
                    username: req.body.username
                },
                errors: mappedErrors
            })
        }else {
            res.status(500).json({
                errors: mappedErrors
            })
        }
    }
}

module.exports = {
    loginFormValidator,
    loginFormValidationHandler
}