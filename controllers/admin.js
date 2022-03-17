const User = require('../models/users')
const bcrypt = require('bcrypt')

module.exports.renderAdminLoginForm = (req, res) => {
    res.render('admin-login/index')
}

module.exports.postAdminLoginForm = async (req, res) => {
    const { schoolID, password } = req.body
    const user = await User.findAndValidate(schoolID, password)
    if (user) {
        req.session.userID = user._id
        // console.log(req.session.userID)
        // const redirectTo = req.session.returnTo || "/home";
        // delete req.session.returnTo;
        return res.redirect('/home')
    }
    return res.redirect('/admin-login')
}

module.exports.renderRegisterForm = (req, res) => {
    res.render('student-register/index')
}

module.exports.postRegisterForm = async (req, res) => {
    const { firstName, lastName, schoolID, password } = req.body
    const user = {
        firstName,
        lastName,
        schoolID,
        password: bcrypt.hashSync(password, 10)
    }
    const newUser = new User(user)
    await newUser.save()
    res.redirect('/admin/register')
}

module.exports.renderNewCourseForm = (req, res) => {
    res.render('newCourseForm')
}

module.exports.postNewCourse = async (req,res) => {
    res.send("new course added")
}