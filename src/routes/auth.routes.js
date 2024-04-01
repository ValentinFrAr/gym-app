const express = require("express");
const router = express.Router();
const { createUser, login } = require("../controllers/auth.controller");

router.route("/register").post(createUser);
router.route("/login").post(login);

module.exports = router;
