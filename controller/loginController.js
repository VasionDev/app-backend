/**
 * Login Controller
 */

// external import
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const createHttpError = require("http-errors")

// internal import
const User = require("../models/People")

// get login page
const getLoginPage = (req, res, next) => {
    res.render('index')
}

// login user
const login = async (req, res, next) => {
    try {
        const user = await User.findOne({
            $or: [{email: req.body.username}, {mobile: req.body.username}]
        })
    
        if(user) {
            isValid = await bcrypt.compare(req.body.password, user.password)
            if(isValid){
                const userObject = {
                    name: user.name,
                    email: user.email,
                    mobile: user.mobile,
                    role: user.role
                }
                const token = await jwt.sign(userObject, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRE
                })

                res.cookie(process.env.COOKIE_NAME, token, {
                    maxAge: process.env.JWT_EXPIRE,
                    httpOnly: true,
                    signed: true
                })
                res.locals.loggedInUser = userObject
                res.redirect('quizzes')
            }else{
                throw createHttpError('Authentication failed')
            }
        }else {
            throw createHttpError('Authentication failed')
        }
    }catch(err) {
        res.render('index', {
            data: {
                username: req.body.username
            },
            errors: {
                common: {
                    msg: err.message
                }
            }
        })
    }
}

// signout
const signout = (req, res, next) => {
    res.clearCookie(process.env.COOKIE_NAME)
    res.send('Signout')
}

module.exports = {
    getLoginPage,
    login,
    signout
}