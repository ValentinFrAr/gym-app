const db = require("../db");

exports.addFavoriteRecipe = async (req, res, next) => {
  const { user_id, recipe_id } = req.body;
  const query =
    "INSERT INTO gym.favorited_recipes (user_id , recipe_id) VALUES ($1, $2)";
  const values = [user_id, recipe_id];
  db.query(query, values, (error, results, fields) => {
    if (error) {
      return res
        .status(400)
        .json({
          message: "Add recipe to favorites failed",
          error: error.message,
        });
    }
    return res
      .status(200)
      .json({ message: "Favorite recipe added successfully" });
  });
};

exports.deleteFavoriteRecipe = async (req, res, next) => {
  const recipe_id = req.params.id;
  const{ user_id }= req.body;
  const query =
    "DELETE FROM gym.favorited_recipes WHERE user_id=$1 AND recipe_id=$2";
  const values = [user_id, recipe_id];
  db.query(query, values, (error, results, fields) => {
    if (error) {
      return res
        .status(400)
        .json({
          message: "Delete recipe favorite failed",
          error: error.message,
        });
    }
    return res
      .status(200)
      .json({ message: "Favorite recipe deleted successfully" });
  });
};
