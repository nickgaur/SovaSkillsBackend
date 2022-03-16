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
    users.postLoginForm
  );

module.exports = router;
