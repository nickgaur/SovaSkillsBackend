const express = require("express");
const router = express.Router({ mergeParams: true });
const users = require("../controllers/users");
const passport = require("passport");
const { isAdmin, isUser } = require("../middleware");

router
  .route("/")
  .get(users.renderLoginForm)
  .post(
    isUser,
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    users.postLoginForm
  );

router
  .route("/admin")
  .get(users.renderAdminLoginForm)
  .post(
    isAdmin,
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login/admin",
    }),
    users.postAdminLoginForm
  );

module.exports = router;
