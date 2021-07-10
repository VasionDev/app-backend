// external import
const createHttpError = require('http-errors')
const multer = require('multer')

// create multer upload object
const uploader = (allowed_file_type, file_max_size, error_message) => {
    const storage = multer.memoryStorage()

    const upload = multer({
        storage: storage,
        limits: file_max_size,
        fileFilter: (req, file, cb) => {
            if(allowed_file_type.includes(file.mimetype)) {
                cb(null, true)
            }else {
                cb(createHttpError(error_message))
            }
        }
    })

    return upload
}

module.exports = uploader