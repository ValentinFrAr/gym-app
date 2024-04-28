const db = require("../db");

exports.addFavoriteRecipe = async (req, res, next) => {
  const { userId, recipeId } = req.body;
  const query =
    "INSERT INTO gym.favorited_recipes (user_id , recipe_id) VALUES ($1, $2)";
  const values = [userId, recipeId];

  db.query(query, values, (error, results, fields) => {
    if (error) {
      return res.status(400).json({
        message: "Add recipe to favorites failed",
        error: error.message,
      });
    }
    return res.status(200).json({
      message: "Favorite recipe added successfully",
      data: { data: { userId: userId, recipeId: recipeId } },
    });
  });
};

exports.deleteFavoriteRecipe = async (req, res, next) => {
  const recipe_id = req.params.id;
  const user_id = req.user.id;
  const query =
    "DELETE FROM gym.favorited_recipes WHERE user_id=$1 AND recipe_id=$2";
  const values = [user_id, recipe_id];
  db.query(query, values, (error, results, fields) => {
    if (error) {
      return res.status(400).json({
        message: "Delete recipe favorite failed",
        error: error.message,
      });
    }
    return res
      .status(200)
      .json({ message: "Favorite recipe deleted successfully" });
  });
};

//////////////////
exports.getAllFavoriterecipes = async (req, res, next) => {
  const userId = req.user.id;
  const query = "SELECT * FROM gym.favorited_recipes WHERE user_id = $1";

  db.query(query, [userId], (error, results) => {
    if (error) {
      res.status(400).json({
        message: "Error getting favorites recipes",
        error: error.message,
      });
    }
    res.status(200).json({
      message: "Favorites recipes got successfully",
      result: results.rows,
    });
  });
};

//////////////////
exports.getFavoriterecipe = async (req, res, next) => {
  const { userId, recipeId } = req.body;
  const query =
    "SELECT * FROM gym.favorited_recipes WHERE user_id = $1 AND recipe_id = $2";

  db.query(query, [userId, recipeId], (error, results) => {
    if (error) {
      res.status(400).json({
        message: "Error getting favorite recipe",
        error: error.message,
      });
    }

    if (results.rows.length === 0) {
      return res.status(404).json({
        message: "Favorite recipe not found",
      });
    }

    res.status(200).json({
      message: "Favorite recipe retrieved successfully",
      result: results.rows[0],
    });
  });
};
