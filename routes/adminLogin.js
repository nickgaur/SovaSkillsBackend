const express = require("express");
const router = express.Router({ mergeParams: true });
const users = require("../controllers/admin");
const {isAdminLoggedIn, isAdmin} = require('../middleware')

router
  .route("/")
  .get(users.renderAdminLoginForm)
  .post(
    isAdmin,
    users.postAdminLoginForm
  );



module.exports = router;
