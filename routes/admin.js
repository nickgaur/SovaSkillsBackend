const express = require("express");
const router = express.Router({ mergeParams: true });
const users = require("../controllers/users");
const admin = require('../controllers/admin')
const { isAdminLoggedIn, isAdmin, isAdminLogged } = require('../middleware')

router
  .route("/")
  .get(admin.renderAdminLoginForm)
  .post(
    isAdmin,
    admin.postAdminLoginForm
  );

router
  .route('/home')
  .get(isAdminLoggedIn, isAdminLogged, users.renderHomepage)

router
  .route("/register")
  .get(isAdminLoggedIn, isAdminLogged, admin.renderRegisterForm)
  .post(isAdminLoggedIn, isAdminLogged, admin.postRegisterForm);

  router.route('/courses').get(isAdminLoggedIn, isAdminLogged, users.renderAllCourses)

module.exports = router;
