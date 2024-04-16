const express = require("express");
const {
  addProgramsToFavorite,
  deleteFavoritedProgram,
} = require("../controllers/fav.programs.controller");
const { private } = require("../middleware/private");
const router = express.Router();

router.route("/add-favorited-program").post(addProgramsToFavorite);
router
  .route("/delete-favorited-program/:id")
  .delete(private, deleteFavoritedProgram);

module.exports = router;
