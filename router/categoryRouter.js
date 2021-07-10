// external import
const express = require('express')

// internal import
const { getCategory, addCategory, deleteCategory, getCategoryEditPage, updateCategory } = require('../controller/categoryController')
const { categoryFormValidator, categoryValidationHandler, categoryUpdateValidator } = require('../middleware/category/categoryFormValidator')
const { checkUserLoggedIn } = require('../middleware/common/checkUserLoggedin')
const decorateHtmlResponse = require('../middleware/common/decorateHtmlResponse')
const uploadImage = require('../middleware/common/uploadImage')

const categoryRouter = express.Router()

categoryRouter.get('/', decorateHtmlResponse('Category'), checkUserLoggedIn, getCategory)
categoryRouter.post('/', uploadImage(true), categoryFormValidator, categoryValidationHandler, addCategory)
categoryRouter.delete('/delete/:id', deleteCategory)
categoryRouter.get('/edit/:id', decorateHtmlResponse('Category Edit'), checkUserLoggedIn, getCategoryEditPage)
categoryRouter.put('/edit/:id', uploadImage(false), categoryUpdateValidator, categoryValidationHandler, updateCategory)

module.exports = categoryRouter