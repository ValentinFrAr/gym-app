const db = require("../db");

////////////////////////////
exports.addExerciseToRoutine = async (req, res, next) => {
  const { routineId, exerciseId, sets, repetitions } = req.body;
  const query =
    "INSERT INTO gym.routine_exercises (routine_id, exercise_id, sets, repetitions) VALUES ($1, $2, $3, $4) RETURNING id";
  const values = [routineId, exerciseId, sets, repetitions];

  db.query(query, values, (error, results) => {
    if (error) {
      res.status(400).json({
        message: "Error adding exercise to routine",
        error: error.message,
      });
    }
    console.log(results);
    const routineExerciseId = results.rows[0].id;
    res.status(201).json({
      message: "Exercise added to routine successfully",
      exerciseId: routineExerciseId,
    });
  });
};

////////////////////////////
exports.deleteExerciseFromRoutine = async (req, res, next) => {
  const routineExerciseId = req.params.id;
  const query = "DELETE FROM gym.routine_exercises WHERE id = $1";
  db.query(query, [routineExerciseId], (error, results) => {
    if (error) {
      res.status(400).json({
        message: "Error deleting exercise from routine",
        error: error.message,
      });
    }
    res
      .status(200)
      .json({ message: "Exercise deleted from routine successfully" });
  });
};

///////////////////////////
exports.getRoutineExercises = async (req, res, next) => {
  const routineId = req.params.id;
  const query =
    "SELECT * FROM gym.routine_exercises JOIN gym.exercises ON gym.routine_exercises.exercise_id = gym.exercises.id WHERE routine_id = $1";

  db.query(query, [routineId], (error, results) => {
    if (error) {
      res
        .status(400)
        .json({ message: "Error getting exercises", error: error.message });
    }
    res.status(200).json({
      message: "Exercises getting successfully",
      result: results.rows,
    });
  });
};
