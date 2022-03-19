const User = require("./models/users");

module.exports.isUserLoggedIn = (req, res, next) => {
  if (!req.session.userID) {
    return res.redirect("/student");
  }
  next();
};

module.exports.isAdminLoggedIn = (req, res, next) => {
  if (!req.session.userID) {
    return res.redirect("/admin");
  }
  next();
};

module.exports.isUser = async (req, res, next) => {
  const { schoolID } = req.body;
  const currentUser = await User.findOne({ schoolID });
  if (!currentUser || currentUser.roles[0] !== "student") {
    return res.redirect("/student");
  }
  next();
};

module.exports.isAdmin = async (req, res, next) => {
  const { schoolID } = req.body;
  const currentUser = await User.findOne({ schoolID });
  if (!currentUser || currentUser.roles[0] !== "admin") {
    return res.redirect("/admin");
  }
  next();
};

module.exports.isAdminLogged = async (req, res, next) => {
  const currID = req.session.userID;
  const user = await User.findById(currID)
  if (user.roles[0] !== 'admin') {
    return res.redirect('/admin')
  }
  next()
}

module.exports.isUserLogged = async (req, res, next) => {
  const currID = req.session.userID;
  const user = await User.findById(currID)
  if (user.roles[0] !== 'student') {
    return res.redirect('/student')
  }
  next()
}