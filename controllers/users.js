const User = require('../models/users')
const bcrypt = require('bcrypt')

module.exports.renderLoginForm = (req, res) => {
    res.render('loginform');
}

module.exports.postLoginForm = async (req, res) => {
    const { schoolID, password } = req.body
    const user = await User.findAndValidate(schoolID, password)
    if (user) {
        req.session.userID = user._id
        const redirectTo = req.session.returnTo || "/home";
        delete req.session.returnTo;
        return res.redirect(redirectTo)
    }
    return res.redirect('/student-login')
}