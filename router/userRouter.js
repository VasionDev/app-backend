// external import
const express = require('express')

// internal import
const { getUserPage, addUser, deleteUser, getUserEditPage } = require('../controller/userController')
const { checkUserLoggedIn, pageRestricted } = require('../middleware/common/checkUserLoggedin')
const decorateHtmlResponse = require('../middleware/common/decorateHtmlResponse')
const uploadImage = require('../middleware/common/uploadImage')
const { userValidationHandler, userFormValidator } = require('../middleware/user/userFormValidator')

const userRouter = express.Router()

userRouter.get('/', decorateHtmlResponse('User'), checkUserLoggedIn, pageRestricted(['user']), getUserPage)
userRouter.post('/', uploadImage(true), userFormValidator, userValidationHandler, addUser)
userRouter.delete('/delete/:id', deleteUser)
// userRouter.get('/edit/:id', decorateHtmlResponse('User Edit'), getUserEditPage)

module.exports = userRouter