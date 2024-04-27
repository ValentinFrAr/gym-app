const express = require("express");
const {
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getRecipe,
  getAllRecipes,
} = require("../controllers/recipes.controller");
const { private } = require("../middleware/private");

const router = express.Router();

router.route("/create-recipe").post(private, createRecipe);
router.route("/update-recipe/:id").put(private, updateRecipe);
router.route("/delete-recipe/:id").delete(private, deleteRecipe);
router.route("/get-recipe/:id").get(getRecipe);
router.route("/get-all-recipes").get(getAllRecipes);

module.exports = router;
