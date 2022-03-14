module.exports.renderRegisterForm = (req, res) => {
    res.render('register')
}

module.exports.postRegisterForm = (req, res, next) => {
    res.send("New user created")
}