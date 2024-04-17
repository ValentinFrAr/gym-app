const db = require("../db");

//////////////////
exports.addProgramsToFavorite = async (req, res, next) => {
  const { user_id, program_id } = req.body;

  const query =
    "INSERT INTO gym.favorited_programs (user_id, program_id) VALUES ($1, $2)";

  db.query(query, [user_id, program_id], (error, results) => {
    if (error) {
      res.status(400).json({
        message: "Error adding program to favorites",
        error: error.message,
      });
    }
    res
      .status(200)
      .json({ message: "Program added to favorites successfully" });
  });
};

///////////////////
exports.deleteFavoritedProgram = async (req, res, next) => {
  const favoritedProgramId = req.params.id;
  const userId = req.user.id;
  const query =
    "DELETE FROM gym.favorited_programs WHERE program_id = $1 AND user_id = $2";

  db.query(query, [favoritedProgramId, userId], (error, results) => {
    if (error) {
      res.status(400).json({
        message: "Error deleting favorited program",
        error: error.message,
      });
    }

    res.status(204).json({
      message: "Favorited program deleted successfully",
    });
  });
};

//////////////////
exports.getAllFavoritePrograms = async (req, res, next) => {
  const { userId } = req.body;
  const query = "SELECT * FROM gym.favorited_programs WHERE user_id = $1";

  db.query(query, [userId], (error, results) => {
    if (error) {
      res.status(400).json({
        message: "Error getting favorites programs",
        error: error.message,
      });
    }
    res.status(200).json({
      message: "Favorites programs got successfully",
      result: results.rows,
    });
  });
};

//////////////////
exports.getFavoriteProgram = async (req, res, next) => {
  const { userId, programId } = req.body;
  const query =
    "SELECT * FROM gym.favorited_programs WHERE user_id = $1 AND program_id = $2";

  db.query(query, [userId, programId], (error, results) => {
    if (error) {
      res.status(400).json({
        message: "Error getting favorite program",
        error: error.message,
      });
    }

    if (results.rows.length === 0) {
      return res.status(404).json({
        message: "Favorite program not found",
      });
    }

    res.status(200).json({
      message: "Favorite program retrieved successfully",
      result: results.rows[0],
    });
  });
};
