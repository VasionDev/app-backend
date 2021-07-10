// external import
const DatauriParser = require('datauri/parser')
const path = require('path')
const parser = new DatauriParser()

// buffer image data to 64
const formatBufferTo64 = (file) => {
    return parser.format(path.extname(file.originalname).toString(), file.buffer)
}

module.exports = formatBufferTo64