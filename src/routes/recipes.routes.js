const express = require("express");
const {
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getRecipe,
  getAllRecipes,
} = require("../controllers/recipes.controller");
const router = express.Router();
//example:  router.route("/route").method(function);//
router.route("/create-recipe").post(createRecipe);
router.route("/update-recipe/:id").put(updateRecipe);
router.route("/delete-recipe/:id").delete(deleteRecipe);
router.route("/get-recipe/:id").get(getRecipe);
router.route("/get-all-recipes").get(getAllRecipes);

module.exports = router;
