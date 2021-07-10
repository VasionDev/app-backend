/**
 * Category model
 */
const mongoose = require('mongoose')

const categorySchema = mongoose.Schema({
    name : {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    }
}, {timestamps: true})

const Category = mongoose.model('Cat', categorySchema)
module.exports = Category
