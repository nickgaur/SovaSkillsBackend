const User = require('../models/users')
const Course = require('../models/courses')
const bcrypt = require('bcrypt')

const checkUser = async () => {

    return currUser
}

module.exports.renderLoginForm = (req, res) => {
    res.render('student-login/index');
}

module.exports.postLoginForm = async (req, res) => {
    const { schoolID, password } = req.body
    const user = await User.findAndValidate(schoolID, password)
    if (user) {
        req.session.userID = user._id
        const redirectTo = req.session.returnTo || "student/home";
        delete req.session.returnTo;
        return res.redirect(redirectTo)
    }
    return res.redirect('/student')
}

module.exports.renderHomepage = async (req, res) => {
    const user = await User.findById(req.session.userID)
    const currUser = user.roles[0]
    res.render('student-dashboard/index', { currUser })
}

module.exports.renderAcademics = (req, res) => {
    res.render('student-dashboard/academics/index')
}

module.exports.renderAllCourses = async (req, res) => {
    const user = await User.findById(req.session.userID)
    const currUser = user.roles[0]
    const allCourses = await Course.find()
    res.render('student-dashboard/courses/index', { allCourses, currUser })
}

