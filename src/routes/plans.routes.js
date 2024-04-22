const express = require("express");
const {
  subscribePlan,
  getAllPlans,
} = require("../controllers/plans.controller");
const { private } = require("../middleware/private");

const router = express.Router();

router.route("/subscribe_plan/:id").put(private, subscribePlan);
router.route("/get-plans").get(private, getAllPlans);

module.exports = router;
