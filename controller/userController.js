/**
 * User Controller
 */

// external import
const bcrypt = require('bcrypt')

// internal import
const User = require("../models/People")
const cloudinaryUpload = require("../utilities/cloudinaryUpload")
const formatBufferTo64 = require("../utilities/formatBuffer")

// get quiz page
const getUserPage = async (req, res, next) => {
    try {
        const users = await User.find().sort({updatedAt: -1})
        res.render('user', {users})
    }catch(err) {
        if(res.locals.html) {
            res.locals.error = err
        }else {
            res.status(500).json({
                message: err.message
            })
        }
    }
}

// add new user
const addUser = async (req, res, next) => {
    try {
        let newUser
        const file64 = formatBufferTo64(req.files[0])
        const uploadResult = await cloudinaryUpload(file64.content, 'app/category')
        const encodedPassword = await bcrypt.hash(req.body.password, 10)
        newUser = new User({
            ...req.body,
            password: encodedPassword,
            image: uploadResult.secure_url
        })
        result = await newUser.save()
        res.status(200).json({
            success: 'User added successfully'
        })
    } catch(err) {
        res.status(500).json({
            errors: {
                common: {
                    msg: err.message
                }
            }
        })
    }
}

// delete user
const deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json({
            message: 'User deleted successfully'
        })
    }catch(err) {
        res.status(500).json({
            error: err.message
        })
    }
}

// get user edit page
const getUserEditPage = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
        res.render('user-edit', {user})
    }catch (err) {
        res.status(404).json({
            error: 'Content not found!'
        })
    }
}

module.exports = {
    getUserPage,
    addUser,
    deleteUser,
    getUserEditPage
}