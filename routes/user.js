const express = require("express");
const router = express.Router({ mergeParams: true });
const users = require("../controllers/users");
const { isUser, isUserLoggedIn, isUserLogged } = require("../middleware");

router
  .route("/")
  .get(users.renderLoginForm)
  .post(
    isUser,
    users.postLoginForm
  );

router
  .route('/home')
  .get(isUserLoggedIn, isUserLogged, users.renderHomepage)

router.route('/academics').get(isUserLoggedIn,isUserLogged, users.renderAcademics)

router.route('/courses').get(isUserLoggedIn, isUserLogged, users.renderAllCourses)

router.route('/community').get(isUserLoggedIn, isUserLogged, users.renderCommunityPage)

router.route('/competitions').get(isUserLoggedIn, isUserLogged, users.renderCompetitionsPage)

module.exports = router;
