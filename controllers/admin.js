const User = require('../models/users')
const bcrypt = require('bcrypt')

module.exports.renderAdminLoginForm = (req, res) => {
    res.render('adminLoginForm')
}

module.exports.postAdminLoginForm = async (req, res) => {
    const { schoolID, password } = req.body
    const user = await User.findAndValidate(schoolID, password)
    if (user) {
        req.session.userID = user._id
        const redirectTo = req.session.returnTo || "/home";
        delete req.session.returnTo;
        return res.redirect(redirectTo)
    }
    return res.redirect('/admin-login')
}

module.exports.renderRegisterForm = (req, res) => {
    res.render('register')
}

module.exports.postRegisterForm = async (req, res) => {
    const { firstName, lastName, schoolID, password } = req.body
    const user = {
        firstName,
        lastName,
        schoolID,
        password: bcrypt.hashSync("admin", 10)
    }
    const newUser = new User(user)
    await newUser.save()
    res.redirect('/admin/register')
}