/**
 * Category Controller
 */

// internal import
const Category = require("../models/Category")
const Quiz = require('../models/Quiz')
const cloudinaryUpload = require("../utilities/cloudinaryUpload")
const formatBufferTo64 = require("../utilities/formatBuffer")

// get login page
const getCategory = async (req, res, next) => {
    try {
        const categories = await Category.find().sort({updatedAt: -1})
        if(res.locals.html) {
            res.render('category', {categories})
        }else {
            res.status(200).json(categories)
        }
    } catch(err) {
        if(res.locals.html) {
            res.locals.error = err
        }else {
            res.status(500).json({
                message: err.message
            })
        }
    }
}

// add new category
const addCategory = async (req, res, next) => {
    try {
        let newCategory
        const file64 = formatBufferTo64(req.files[0])
        const uploadResult = await cloudinaryUpload(file64.content, 'app/category')
        newCategory = new Category({
            ...req.body,
            image: uploadResult.secure_url
        })
        result = await newCategory.save()
        res.status(200).json({
            success: 'Category added successfully'
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

// delete category
const deleteCategory = async (req, res, next) => {
    try {
        await Category.findByIdAndDelete(req.params.id)
        await Quiz.findOneAndUpdate(
            { category: req.params.id },
            { category: null },
            { new: true },
            (err, updatedData) => {
                if(err) {
                    res.status(500).json({
                        error: err.message
                    })
                }else {
                    // console.log(updatedData)
                }
            }
        )
        res.status(200).json({
            message: 'Category deleted successfully'
        })
    }catch(err) {
        res.status(500).json({
            error: err.message
        })
    }
}

// get category edit page
const getCategoryEditPage = async (req, res, next) => {
    try {
        const category = await Category.findById(req.params.id)
        res.render('category-edit', {category})
    }catch(err) {
        res.status(404).json({
            error: 'Content not found!'
        })
    }
}

// update category
const updateCategory = async (req, res, next) => {
    try {
        let updateData
        if(req.files.length > 0 ){
            const file64 = formatBufferTo64(req.files[0])
            const uploadResult = await cloudinaryUpload(file64.content, 'app/category')
            updateData = {
                ...req.body,
                image: uploadResult.secure_url
            }
        }else {
            updateData = {
                ...req.body,
            } 
        }
        await Category.findByIdAndUpdate(req.params.id, updateData)
        res.status(200).json({
            success: 'Category updated successfully'
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
    getCategory,
    addCategory,
    deleteCategory,
    getCategoryEditPage,
    updateCategory
}