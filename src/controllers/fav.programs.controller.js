const db = require("../db");

////////////////

exports.addProgramsToFavorite = async (req, res, next) => {
  const { user_id, program_id } = req.body;
  console.log(user_id, program_id);

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
