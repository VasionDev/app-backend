// External import
const cloudinary = require('cloudinary').v2
const dotenv = require('dotenv')

dotenv.config()

// cloudinary config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

// cloudinary upload
const cloudinaryUpload = (file, folder_name) => {
    return cloudinary.uploader.upload(file, {
        folder: folder_name
    })
}
module.exports = cloudinaryUpload