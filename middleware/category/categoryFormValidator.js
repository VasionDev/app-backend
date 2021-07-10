/**
 * Category Middleware
 */

// external import
const createHttpError = require("http-errors");
const { check, validationResult } = require("express-validator");

// internal import
const Category = require("../../models/Category");

// category create form validator
const categoryFormValidator = [
    check('name')
        .isLength({min: 1})
        .withMessage('Category name must not be empty.')
        .trim()
        .custom(async (value) => {
            try{
                const result = await Category.find({name: value})
                if(result.length) {
                    throw createHttpError('Category name already exist')
                }
            }catch (err) {
                throw createHttpError(err.message)
            }
        })
]

// category update form validator
const categoryUpdateValidator = [
    check('name')
        .isLength({min: 1})
        .withMessage('Category name must not be empty.')
        .trim()
]

// category validator handler
const categoryValidationHandler = (req, res, next) => {
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
    categoryFormValidator,
    categoryUpdateValidator,
    categoryValidationHandler
}