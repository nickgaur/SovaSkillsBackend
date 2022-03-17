const express = require("express");
const router = express.Router({ mergeParams: true });
const users = require("../controllers/home");
const { isUserLoggedIn, isAdmin } = require('../middleware')

router
.route('/home')
.get(isUserLoggedIn,users.renderHomepage)

router.route('/logout').get(users.logout)

module.exports = router