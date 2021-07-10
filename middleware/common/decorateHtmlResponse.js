const decorateHtmlResponse = (page_title) => {
    return (req, res, next) => {
        res.locals.html = true
        res.locals.title = `${page_title} | ${process.env.APP_NAME}`
        res.locals.errors = {}
        res.locals.data = {}
        res.locals.loggedInUser = {}
        next()
    }
}
module.exports = decorateHtmlResponse