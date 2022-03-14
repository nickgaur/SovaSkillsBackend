const User = require("./models/users");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }
  next();
};

module.exports.isAdminLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/login/admin");
  }
  next();
};

module.exports.isUser = async (req, res, next) => {
  const username = req.body.username;
  const currentUser = await User.findOne({ username });
  if (!currentUser || currentUser.roles[0] !== "user") {
    return res.redirect("/login");
  }
  next();
};

module.exports.isAdmin = async (req, res, next) => {
  const username = req.body.username;
  const currentUser = await User.findOne({ username });
  if (!currentUser || currentUser.roles[0] !== "admin") {
    return res.redirect("/login/admin");
  }
  next();
};
