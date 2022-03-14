module.exports.renderLoginForm = (req, res) => {
    res.render('loginForm');
}

module.exports.postLoginForm = (req, res) => {
    res.send('post login form success')
}

module.exports.renderAdminLoginForm = (req, res) => {
    res.render('adminLoginForm')
}

module.exports.postAdminLoginForm = (req, res) => {
    res.render('logout')
}