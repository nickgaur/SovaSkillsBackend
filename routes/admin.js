const express = require("express");
const router = express.Router({ mergeParams: true });
const users = require("../controllers/admin");
const { isAdminLoggedIn, isAdminLogged } = require('../middleware')

router
    .route("/register")
    .get(isAdminLoggedIn, isAdminLogged, users.renderRegisterForm)
    .post(isAdminLoggedIn, isAdminLogged, users.postRegisterForm);

// router
// .route('/newcourse')
// .get(isAdminLoggedIn, isAdmin, users.renderNewCourseForm)
// .post(isAdminLoggedIn, isAdmin, users.postNewCourse)

module.exports = router