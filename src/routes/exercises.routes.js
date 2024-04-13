const express = require("express");
const {
  getExercise,
  getAllExercises,
} = require("../controllers/exercises.controller");
const router = express.Router();
//example:  router.route("/route").method(function);//
router.route("/get-exercise/:id").get(getExercise);
router.route("/get-all-exercises").get(getAllExercises);

module.exports = router;
