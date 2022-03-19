const User = require('../models/users')
const Course = require('../models/courses')
const bcrypt = require('bcrypt')


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
    const currUser = await User.findById(req.session.userID)
    res.render('student-dashboard/index', { currUser })
}

module.exports.renderAcademics = async (req, res) => {
    const currUser = await User.findById(req.session.userID)
    res.render('student-dashboard/academics/index', {currUser})
}

module.exports.renderAllCourses = async (req, res) => {
    const currUser = await User.findById(req.session.userID)
    const allCourses = await Course.find()
    res.render('student-dashboard/courses/index', { allCourses, currUser })
}

module.exports.renderCommunityPage = async (req, res) => {
    const currUser = await User.findById(req.session.userID)
    res.render('student-dashboard/community/index', { currUser })
}

module.exports.renderCompetitionsPage = async (req, res) => {
    const currUser = await User.findById(req.session.userID)
    res.render('student-dashboard/competition/index', { currUser })
}



