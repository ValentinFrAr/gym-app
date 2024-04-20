const express = require("express");
const {
  addProgramsToFavorite,
  deleteFavoritedProgram,
  getAllFavoritePrograms,
  getFavoriteProgram,
} = require("../controllers/fav.programs.controller");
const { private } = require("../middleware/private");
const router = express.Router();

router.route("/add-favorited-program").post(private, addProgramsToFavorite);
router
  .route("/delete-favorited-program/:id")
  .delete(private, deleteFavoritedProgram);
router
  .route("/get-all-favorited-programs")
  .get(private, getAllFavoritePrograms);
router.route("/get-favorited-program").get(private, getFavoriteProgram);

module.exports = router;
