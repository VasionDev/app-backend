const express = require('express')
const { getQuiz } = require('../controller/quizController')
const { getCategory } = require('../controller/categoryController')

const apiRouter = express.Router()

apiRouter.get('/quiz', getQuiz)
apiRouter.get('/category', getCategory)

module.exports = apiRouter