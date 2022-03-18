const users = require("../models/users")


module.exports.logout = (req, res) => {
    req.session.destroy()
    res.redirect('/')
}

