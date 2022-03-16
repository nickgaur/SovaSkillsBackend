const express = require("express");
const router = express.Router({ mergeParams: true });
const users = require("../controllers/admin");
const { isAdminLoggedIn, isAdmin } = require('../middleware')

router
    .route("/register")
    .get(isAdminLoggedIn, isAdmin, users.renderRegisterForm)
    .post(isAdminLoggedIn, isAdmin, users.postRegisterForm);

module.exports = router