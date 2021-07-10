/**
 * Quiz/Question Controller
 */

// internal import
const Category = require("../models/Category")
const Quiz = require("../models/Quiz")
const districtList = require("../utilities/districtList")
const cloudinaryUpload = require("../utilities/cloudinaryUpload")
const formatBufferTo64 = require("../utilities/formatBuffer")

// get quiz page
const getQuiz = async (req, res, next) => {
    try {
        categories = await Category.find().sort({'updatedAt': -1})
        const quizzes = await Quiz.find().sort({updatedAt: -1}).populate('category')
        if(res.locals.html) {
            res.render('quiz', {quizzes, categories, districtList})
        }else {
            res.status(200).json(quizzes)
        }
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

// add new quiz
const addQuiz = async (req, res, next) => {
    try {
        let newQuiz
        const file64 = formatBufferTo64(req.files[0])
        const uploadResult = await cloudinaryUpload(file64.content, 'app/quiz')
        newQuiz = new Quiz({
            ...req.body,
            image: uploadResult.secure_url
        })
        result = await newQuiz.save()
        res.status(200).json({
            success: 'Quiz added successfully'
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

//delete quiz 
const deleteQuiz = async (req, res, next) => {
    try {
        await Quiz.findByIdAndDelete(req.params.id)
        res.status(200).json({
            message: 'Quiz deleted successfully'
        })
    }catch(err) {
        res.status(500).json({
            error: err.message
        })
    }
}

// get quiz edit page
const getQuizEditPage = async (req, res, next) => {
    try {
        categories = await Category.find().sort({'updatedAt': -1})
        const quiz = await Quiz.findById(req.params.id)
        res.render('quiz-edit', {quiz, categories, districtList})
    }catch (err) {
        res.status(404).json({
            error: 'Content not found!'
        })
    }
}

// update quiz
const updateQuiz = async (req, res, next) => {
    try {
        let updateData
        if(req.files.length > 0 ){
            const file64 = formatBufferTo64(req.files[0])
            const uploadResult = await cloudinaryUpload(file64.content, 'app/quiz')
            updateData = {
                ...req.body,
                image: uploadResult.secure_url
            }
        }else {
            updateData = {
                ...req.body,
            } 
        }
        await Quiz.findByIdAndUpdate(req.params.id, updateData)
        res.status(200).json({
            success: 'Quiz updated successfully'
        })
    }catch(err) {
        res.status(500).json({
            errors: {
                common: {
                    msg: err.message
                }
            }
        })
    }
}

module.exports = {
    getQuiz,
    addQuiz,
    deleteQuiz,
    getQuizEditPage,
    updateQuiz
}