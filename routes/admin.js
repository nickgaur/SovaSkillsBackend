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

router.route('/academics').get(isAdminLoggedIn, isAdminLogged, users.renderAcademics)

router.route('/courses').get(isAdminLoggedIn, isAdminLogged, users.renderAllCourses)

router.route('/community').get(isAdminLoggedIn, isAdminLogged, users.renderCommunityPage)

router.route('/competitions').get(isAdminLoggedIn, isAdminLogged, users.renderCompetitionsPage)

router
  .route('/courses/new')
  .get(isAdminLoggedIn, isAdminLogged, admin.renderNewCourseForm)
  .post(isAdminLoggedIn, isAdminLogged, admin.postNewCourse)

router.
route('/courses/:courseId/edit').
get(isAdminLoggedIn, isAdminLogged, admin.renderEditCourse)
.put(isAdminLoggedIn, isAdminLogged, admin.postEditCourse)

router.route('/courses/:courseId/delete')
  .delete(isAdminLoggedIn, isAdminLogged, admin.deleteCourse)


module.exports = router;