const express = require("express");
const {
  getExercise,
  getAllExercises,
  getExerciseByName,
} = require("../controllers/exercises.controller");
const router = express.Router();
//example:  router.route("/route").method(function);//
router.route("/get-exercise/:id").get(getExercise);
router.route("/get-all-exercises").get(getAllExercises);
router.route("/get-exercises-name").get(getExerciseByName);

module.exports = router;
