// external import
const express = require('express')

// internal import
const { getQuiz, addQuiz, deleteQuiz, getQuizEditPage, updateQuiz } = require('../controller/quizController')
const { checkUserLoggedIn } = require('../middleware/common/checkUserLoggedin')
const decorateHtmlResponse = require('../middleware/common/decorateHtmlResponse')
const uploadImage = require('../middleware/common/uploadImage')
const { quizFormValidator, quizValidationHandler } = require('../middleware/quiz/quizFormValidator')

const quizRouter = express.Router()

quizRouter.get('/', decorateHtmlResponse('Quiz'), checkUserLoggedIn, getQuiz)
quizRouter.post('/',  uploadImage(true), quizFormValidator, quizValidationHandler, addQuiz)
quizRouter.delete('/delete/:id', deleteQuiz)
quizRouter.get('/edit/:id', decorateHtmlResponse('Quiz Edit'), checkUserLoggedIn, getQuizEditPage)
quizRouter.put('/edit/:id', uploadImage(false), quizFormValidator, quizValidationHandler, updateQuiz)

module.exports = quizRouter