const dotenv = require("dotenv").config();
const db = require("../db");
const nodemailer = require("nodemailer");

exports.createRecipe = async (req, res, next) => {
  const { name, description, ingredients, objetive } = req.body;
  const query =
    "INSERT INTO gym.recipes (recipe_name , recipe_description , ingredients , recipe_objetive) VALUES ($1, $2, $3, $4)";
  const values = [name, description, ingredients, objetive];
  db.query(query, values, (error, results, fields) => {
    if (error) {
      res
        .status(400)
        .json({ message: "Create recipe failed", error: error.message });
    }
    return res.status(201).json({ message: "Recipe created successfully" });
  });
};

exports.updateRecipe = async (req, res, next) => {
  const { name, description, ingredients, objetive } = req.body;
  const id = req.params.id;
  const query = `UPDATE gym.recipes SET recipe_name=$1, recipe_description=$2, ingredients=$3, recipe_objetive=$4 WHERE id=$5`;
  const values = [name, description, ingredients, objetive, id]
  db.query(query,values, (error, results) => {
    if (error) {
      res
        .status(400)
        .json({ message: "Recipe update failed", error: error.message });
    }
    return res.status(200).json({ message: "Recipe updated successfully" });
  });
};

exports.deleteRecipe = async (req, res, next) => {
  const id = req.params.id;
  const query = `DELETE FROM gym.recipes WHERE id=${id}`;
  db.query(query, (error, results) => {
    if (error) {
      res
        .status(400)
        .json({ message: "Error deleting recipe", error: error.message });
    }
    return res.status(204).json({ message: "Delete recipe successfull" });
  });
};

exports.getRecipe = async (req, res, next) => {
  const id = req.params.id;
  const query = `SELECT * FROM gym.recipes WHERE id=${id}`;
  db.query(query, (error, results) => {
    if (error) {
      res
        .status(400)
        .json({ message: "Error get recipe", error: error.message });
    }
    const recipe = results.rows[0];
    return res.status(200).json({ message: "Recipe get successfully", response:recipe });
  });
};

exports.getAllRecipes = async (req, res, next) => {
  const query = "SELECT * FROM gym.recipes";
  db.query(query, (error, results, fields) => {
    if (error) {
      res
        .status(400)
        .json({ message: "Recipe not found", error: error.message });
    }
    return res.status(200).json({message:"Get recipes successfully",response:results.rows});
  });
};
