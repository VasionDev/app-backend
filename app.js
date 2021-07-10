// external import
const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

// internal import 
const { notFoundHandler, errorHandler } = require('./middleware/common/errorHandler')
const loginRouter = require('./router/loginRouter')
const categoryRouter = require('./router/categoryRouter')
const quizRouter = require('./router/quizRouter')
const userRouter = require('./router/userRouter')
const apiRouter = require('./router/apiRouter')

const app = express()
dotenv.config()

// database connection
mongoose.connect(process.env.DB_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
.then(()=> {
    console.log('Database connected successfully')
    app.listen(process.env.PORT, () => {
        console.log(`Sever is running on port ${process.env.PORT}`)
    })
})
.catch(err=> {
    console.log(err)
})

// require parser
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs')

// router
app.use('/', loginRouter)
app.use('/categories', categoryRouter)
app.use('/quizzes', quizRouter)
app.use('/users', userRouter)
app.use('/api', apiRouter)

// not found handler
app.use(notFoundHandler)
// error handler
app.use(errorHandler)

