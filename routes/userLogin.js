const express = require("express");
const router = express.Router({ mergeParams: true });
const users = require("../controllers/users");
const { isUser } = require("../middleware");

router
  .route("/")
  .get(users.renderLoginForm)
  .post(
    isUser,
    users.postLoginForm
  );

module.exports = router;
