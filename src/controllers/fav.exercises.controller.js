const db = require("../db");

////////////////
exports.addExerciseToFavorite = async (req, res, next) => {
  const { userId, exerciseId } = req.body;

  const query =
    "INSERT INTO gym.favorited_exercises (user_id, exercise_id) VALUES ($1, $2)";

  db.query(query, [userId, exerciseId], (error, results) => {
    if (error) {
      res.status(400).json({
        message: "Error adding exercise to favortie",
        error: error.message,
      });
    }
    res
      .status(200)
      .json({ message: "Exercise added to favorites successfully" });
  });
};

///////////////
exports.deleteFavoriteExercise = async (req, res, next) => {
  const favoriteExerciseId = req.params.id;
  const userId = req.user.id;
  const query =
    "DELETE FROM gym.favorited_exercises WHERE exercise_id = $1 AND user_id = $2";

  db.query(query, [favoriteExerciseId, userId], (error, results) => {
    if (error) {
      res.status(400).json({
        message: "Error deleting favorited exercise",
        error: error.message,
      });
    }

    res
      .status(204)
      .json({ message: "Favorited exercise deleted successfully" });
  });
};

//////////////
exports.getAllFavoritesExercises = async (req, res, next) => {
  const { userId } = req.body;
  const query = "SELECT * FROM gym.favorited_exercises WHERE user_id = $1";

  db.query(query, [userId], (error, results) => {
    if (error) {
      res.status(400).json({
        message: "Error getting favorites exercises",
        error: error.message,
      });
    }
    res.status(200).json({
      message: "Favorites exercises got successfully",
      result: results.rows,
    });
  });
};

/////////////
exports.getFavoriteExercise = async (req, res, next) => {
  const { userId, exerciseId } = req.body;
  const query =
    "SELECT * FROM gym.favorited_exercises WHERE user_id = $1 AND exercise_id = $2";

  db.query(query, [userId, exerciseId], (error, results) => {
    if (error) {
      res.status(400).json({
        message: "Error getting favorite exercise",
        error: error.message,
      });
    }

    if (results.rows.length === 0) {
      return res.status(404).json({
        message: "Favorite exercise not found",
      });
    }

    res.status(200).json({
      message: "Favorite exercise retrieved",
      result: results.rows[0],
    });
  });
};
