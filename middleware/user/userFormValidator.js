// external import
const { check, validationResult } = require("express-validator");
const createHttpError = require("http-errors");

// internal import
const User = require("../../models/People");

// user form validator
const userFormValidator = [
    check('name')
        .isLength({min: 2})
        .withMessage('Name must not be empty and min 2 character.')
        .isAlpha('en-US', " -")
        .withMessage('Name must be in Alphabet')
        .trim(),
    check('email')
        .isEmail()
        .withMessage('Must be a valid email')
        .trim()
        .custom(async (value) => {
            try{
                const result = await User.find({email: value})
                if(result.length) {
                    throw createHttpError('Email already exist')
                }
            }catch (err) {
                throw createHttpError(err.message)
            }
        }),
    check('mobile')
        .isMobilePhone('bn-BD', { strictMode: true })
        .withMessage('Must be a valid BD phone number')
        .custom(async (value) => {
            try{
                const result = await User.find({mobile: value})
                if(result.length) {
                    throw createHttpError('Mobile number already exist')
                }
            }catch (err) {
                throw createHttpError(err.message)
            }
        }),
    check('password')
        .isStrongPassword()
        .withMessage('Password length must be minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1')
        
]

// user form validation handler
const userValidationHandler = (req, res, next) => {
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
    userFormValidator,
    userValidationHandler,
}