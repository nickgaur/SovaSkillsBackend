const User = require("./models/users");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.session.userID) {
    return res.redirect("/student-login");
  }
  next();
};

module.exports.isAdminLoggedIn = (req, res, next) => {
  if (!req.session.userID) {
    return res.redirect("/admin-login");
  }
  next();
};

module.exports.isUser = async (req, res, next) => {
  const {schoolID} = req.body;
  const currentUser = await User.findOne({ schoolID });
  if (!currentUser || currentUser.roles[0] !== "user") {
    return res.redirect("/student-login");
  }
  next();
};

module.exports.isAdmin = async (req, res, next) => {
  const username = req.body.username;
  const currentUser = await User.findOne({ username });
  if (!currentUser || currentUser.roles[0] !== "admin") {
    return res.redirect("/admin-login");
  }
  next();
};