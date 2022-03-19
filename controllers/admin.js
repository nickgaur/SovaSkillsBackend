const User = require('../models/users')
const bcrypt = require('bcrypt')
const Course = require('../models/courses')
const { findById, findByIdAndUpdate } = require('../models/users')

module.exports.renderAdminLoginForm = (req, res) => {
    res.render('admin-login/index')
}

module.exports.postAdminLoginForm = async (req, res) => {
    const { schoolID, password } = req.body
    const user = await User.findAndValidate(schoolID, password)
    if (user) {
        req.session.userID = user._id
        const redirectTo = req.session.returnTo || "admin/home";
        delete req.session.returnTo;
        return res.redirect(redirectTo)
    }
    return res.redirect('/admin')
}

module.exports.renderRegisterForm = (req, res) => {
    res.render('student-register/index')
}

module.exports.postRegisterForm = async (req, res) => {
    try {
        const { firstName, lastName, schoolID, password } = req.body
        const user = {
            firstName,
            lastName,
            schoolID,
            password: bcrypt.hashSync(password, 10)
        }
        const newUser = new User(user)
        await newUser.save()
        req.flash('success', 'New user registered.')
        return res.redirect('/admin/register')
    }
    catch (error) {
        req.flash('error', 'User already registered!!')
        return res.redirect("/admin/register")
    }
}

module.exports.renderNewCourseForm = (req, res) => {
    res.render('forms/addNew')
}

module.exports.postNewCourse = async (req, res) => {
    const { title, level, duration } = req.body
    const newCourse = await new Course({
        title,
        level,
        duration
    })
    await newCourse.save()
    res.redirect("/admin/courses")
}

module.exports.renderEditCourse = async (req, res) => {
    const course = await Course.findById(req.params.courseId)
    res.render('forms/edit', { course })
}

module.exports.postEditCourse = async (req, res) => {
    // const {title, level, duration} = req.body
    await Course.findByIdAndUpdate(req.params.courseId, req.body)
    res.redirect('/admin/courses')
}

module.exports.deleteCourse = async (req, res) => {
    await Course.findByIdAndDelete(req.params.courseId);
    req.flash("success", "Course Deleted Successfully");
    res.redirect("/admin/courses");
};