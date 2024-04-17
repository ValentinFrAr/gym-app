const express = require("express");
const {
  addFavoriteRecipe,
  deleteFavoriteRecipe,
} = require("../controllers/fav.recipes.controller");
const router = express.Router();

router.route("/add-favorite-recipe").post(addFavoriteRecipe);
router.route("/delete-favorite-recipe/:id").delete(deleteFavoriteRecipe);

module.exports = router;
