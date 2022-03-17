module.exports.renderHomepage = (req, res) => {
    res.render('student-dashboard/index')
}

module.exports.logout = (req, res) => {
    req.session.destroy()
    res.redirect('/')
}