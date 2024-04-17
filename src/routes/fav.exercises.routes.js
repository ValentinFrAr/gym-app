const express = require("express");
const {
  addExerciseToFavorite,
  deleteFavoriteExercise,
  getAllFavoritesExercises,
  getFavoriteExercise,
} = require("../controllers/fav.exercises.controller");
const router = express.Router();

router.route("/add-favorited-exercise").post(addExerciseToFavorite);
router.route("/delete-favorited-exercise").delete(deleteFavoriteExercise);
router.route("/get-all-favorited-exercises").get(getAllFavoritesExercises);
router.route("/add-favorited-exercise").get(getFavoriteExercise);

module.exports = router;
