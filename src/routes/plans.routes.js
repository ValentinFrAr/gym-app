const express = require("express");
const { subscribePlan } = require("../controllers/plans.controller");
const router = express.Router();

router.route("/subscribe_plan/:id").put(subscribePlan);

module.exports = router;
