/**
 * Quiz/Question model
 */
const mongoose = require('mongoose')

const quizSchema = mongoose.Schema({
    title : {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cat',
        required: true
    },
    location : {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, {timestamps: true})

const Quiz = mongoose.model('Question', quizSchema)
module.exports = Quiz

