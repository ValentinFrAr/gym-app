const dotenv = require("dotenv").config();
const db = require("../db");
const nodemailer = require("nodemailer");

exports.createRoutine = async (req, res, next) => {
  const { day, programId, name, description, userCalendar } = req.body;
  const query =
    "INSERT INTO gym.routines (day, program_id, name, description, user_calendar) VALUES ($1, $2, $3, $4, $5) RETURNING id";
  const values = [day, programId, name, description, userCalendar];
  db.query(query, values, (error, results, fields) => {
    if (error) {
      return res
        .status(400)
        .json({ message: "Create routine failed", error: error.message });
    }
    const response = results.rows[0].id;
    return res
      .status(201)
      .json({ message: "Routine created successfully", response: response });
  });
};

exports.getRoutine = async (req, res, next) => {
  const id = req.params.id;
  const query = "SELECT * FROM gym.routines WHERE id =$1";
  const values = [id];
  db.query(query, values, (error, results) => {
    if (error) {
      return res
        .stautus(400)
        .json({ message: "Get routine failed", error: error.message });
    }
    const response = results.rows[0];
    return res
      .status(200)
      .json({ message: "Get routine succesfully", response: response });
  });
};

exports.updateRoutine = async (req, res, next) => {
  const { day, name, description, userCalendar } = req.body;
  const id = req.params.id;
  const query =
    "UPDATE gym.routines SET day=$1 , name=$2, description=$3, user_calendar=$4 WHERE id=$5";
  const values = [day, name, description, userCalendar, id];
  db.query(query, values, (error, results) => {
    if (error) {
      return res
        .status(200)
        .json({ message: "Update routine failed", error: error.message });
    }
    return res.status(200).json({ message: "Routine updated successfully" });
  });
};

exports.deleteRoutine = async (req, res, next) => {
  const id = req.params.id;
  const query = "DELETE FROM gym.routines WHERE id=$1";
  const values = [id];
  db.query(query, values, (error, results) => {
    if (error) {
      return res
        .status(400)
        .json({ message: "Error deleting routine", error: error.message });
    }
    return res.status(200).json({ message: "Routine deleted successfuly" });
  });
};

exports.getAllRoutines = async (req, res, next) => {
  const query = "SELECT * FROM gym.routines";
  db.query(query, (error, results, fields) => {
    if (error) {
      res
        .status(400)
        .json({ message: "Routines not found", error: error.message });
    }
    return res
      .status(200)
      .json({ message: "Get routines successfully", response: results.rows });
  });
};
