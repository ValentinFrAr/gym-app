const express = require("express");
const { subscribePlan } = require("../controllers/plans.controller");
const { private } = require("../middleware/private");

const router = express.Router();

router.route("/subscribe_plan/:id").put(private, subscribePlan);

module.exports = router;
