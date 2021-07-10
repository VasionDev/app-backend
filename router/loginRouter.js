// external import
const express = require('express')

// internal controller import
const { getLoginPage, login, signout } = require('../controller/loginController')

// internal middleware import
const { redirectLogin } = require('../middleware/common/checkUserLoggedin')
const decorateHtmlResponse = require('../middleware/common/decorateHtmlResponse')
const { loginFormValidator, loginFormValidationHandler } = require('../middleware/login/loginFormValidator')

const loginRouter = express.Router()

loginRouter.get('/', decorateHtmlResponse('Login'), redirectLogin, getLoginPage)
loginRouter.post('/', decorateHtmlResponse('Login'), loginFormValidator, loginFormValidationHandler, login)
loginRouter.delete('/', signout)

module.exports = loginRouter