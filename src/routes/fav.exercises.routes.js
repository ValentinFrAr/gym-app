const express = require("express");
const {
  addExerciseToFavorite,
  deleteFavoriteExercise,
  getAllFavoritesExercises,
  getFavoriteExercise,
} = require("../controllers/fav.exercises.controller");
const { private } = require("../middleware/private");

const router = express.Router();

router.route("/add-favorited-exercise").post(private, addExerciseToFavorite);
router
  .route("/delete-favorited-exercise")
  .delete(private, deleteFavoriteExercise);
router
  .route("/get-all-favorited-exercises")
  .get(private, getAllFavoritesExercises);
router.route("/add-favorited-exercise").get(private, getFavoriteExercise);

module.exports = router;
