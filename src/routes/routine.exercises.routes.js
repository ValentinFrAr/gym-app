const express = require("express");
const {
  addExerciseToRoutine,
  deleteExerciseFromRoutine,
  getRoutineExercises,
} = require("../controllers/routine.exercises.controller");
const router = express.Router();

router.route("/add-exercise-routine").post(addExerciseToRoutine);
router.route("/delete-exercise-routine/:id").delete(deleteExerciseFromRoutine);
router.route("/get-exercise-routine/:id").get(getRoutineExercises);

module.exports = router;
