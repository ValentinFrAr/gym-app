const express = require("express");
const {
  addFavoriteRecipe,
  deleteFavoriteRecipe,
  getAllFavoriterecipes,
  getFavoriterecipe,
} = require("../controllers/fav.recipes.controller");
const { private } = require("../middleware/private");

const router = express.Router();

router.route("/add-favorite-recipe").post(private, addFavoriteRecipe);
router
  .route("/delete-favorite-recipe/:id")
  .delete(private, deleteFavoriteRecipe);
router.route("/get-all-favorite-recipes").get(private, getAllFavoriterecipes);
router.route("/get--favorite-recipe/:id").get(private, getFavoriterecipe);

module.exports = router;
