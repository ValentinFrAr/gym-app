const express = require("express");
const {
  addExerciseToRoutine,
  deleteExerciseFromRoutine,
  getRoutineExercises,
} = require("../controllers/routine.exercises.controller");
const { private } = require("../middleware/private");

const router = express.Router();

router.route("/add-exercise-routine").post(private, addExerciseToRoutine);
router
  .route("/delete-exercise-routine/:id")
  .delete(private, deleteExerciseFromRoutine);
router.route("/get-exercise-routine").get(getRoutineExercises);

module.exports = router;
