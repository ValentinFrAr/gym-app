const dotenv = require("dotenv").config();
const db = require("../db");
const nodemailer = require("nodemailer");

exports.getExercise = async (req, res, next) => {
  const id = req.params.id;
  const query = `SELECT * FROM gym.exercises WHERE id=$1`;
  db.query(query, [id], (error, results, fields) => {
    if (error) {
      return res
        .status(400)
        .json({ message: "Exercise not found", error: error.message });
    }
    const response = results.rows[0];
    return res
      .status(200)
      .json({ message: "Exercise successfully founded", response: response });
  });
};

exports.getExerciseByName = async (req, res, next) => {
  const { muscle } = req.query;
  console.log("Muscle received:", muscle);
  const query = `SELECT * FROM gym.exercises WHERE muscle=$1`;
  db.query(query, [muscle], (error, results, fields) => {
    if (error) {
      return res
        .status(400)
        .json({ message: "Exercise not found", error: error.message });
    }
    const response = results.rows;
    console.log("Exercises found:", response);
    return res
      .status(200)
      .json({ message: "Exercise successfully founded", muscle: response });
  });
};

exports.getAllExercises = async (req, res, next) => {
  const query = `SELECT * FROM gym.exercises`;
  db.query(query, (error, results, fields) => {
    if (error) {
      return res
        .status(400)
        .json({ message: "Exercises not found", error: error.message });
    }
    const response = results.rows;
    return res
      .status(200)
      .json({ message: "Exercises successfully loaded", exercises: response });
  });
};
