// external import
const jwt = require('jsonwebtoken')

// set user information if logged in or not
const checkUserLoggedIn = async (req, res, next) => {
    try {
        let cookies =  Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null
        if(cookies) {
            const token = cookies[process.env.COOKIE_NAME]
            if(token) {
                const decoded = jwt.verify(token, process.env.JWT_SECRET)
                req.user = decoded
                if(res.locals.html) {
                    res.locals.loggedInUser = decoded
                }
                next()
            }else {
                res.redirect('/')
            }
        }else {
            res.redirect('/')
        }

    }catch(err) {
        res.redirect('/')
    }
}

// restricted login page after logged in
const redirectLogin = (req, res, next) => {
    const cookies = Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null
    if(cookies && cookies[process.env.COOKIE_NAME]) {
        res.redirect('quizzes')
    }else {
        next()
    }
}

// restricted page to user
const pageRestricted = (restricted_for) => {
    return (req, res, next) => {
        if(restricted_for.includes(res.locals.loggedInUser.role)) {
            res.render('restricted', { title: 'Restricted' })
        }else {
            next()
        }
    }
}

module.exports = {
    checkUserLoggedIn,
    redirectLogin,
    pageRestricted
}