const nodemailer = require("nodemailer");
const db = require("../db");

/////////////

exports.createProgram = async (req, res, next) => {
  const { name, description, weekly_routine, duration_program } = req.body;
  const user_id = req.params.id;
  const queryCreateProgram =
    "INSERT INTO gym.programs (name, description, weekly_routine, duration_program, user_id) VALUES ($1, $2, $3, $4, $5)";
  const values = [name, description, weekly_routine, duration_program, user_id];

  db.query(queryCreateProgram, values, (error, results) => {
    if (error) {
      res
        .status(400)
        .json({ message: "Error creating program", error: error.message });
    }
    res.status(201).json({
      message: "Program successfully created",
      program: results.insertId,
    });
  });
};

///////////////

exports.modificateProgram = async (req, res, next) => {
  const { name, description, weekly_routine, duration_program } = req.body;
  const programId = req.params.id;
  const queryModificate =
    "UPDATE gym.programs SET name = $1, description = $2, weekly_routine = $3, duration_program = $4 WHERE id = $5";
  const values = [
    name,
    description,
    weekly_routine,
    duration_program,
    programId,
  ];

  db.query(queryModificate, values, (error, results) => {
    if (error) {
      res
        .status(400)
        .json({ message: "Error modificating program", error: error.message });
    }
    res.status(200).json({
      message: "Program successfully modificated",
      program_id: results.insertId,
    });
  });
};

//////////////

exports.deleteProgram = async (req, res, next) => {
  const programsId = req.params.id;
  const queryDelete = "DELETE FROM gym.programs WHERE id = $1";

  db.query(queryDelete, [programsId], (error, results) => {
    if (error) {
      res
        .status(400)
        .json({ message: "Error deleting program", error: error.message });
    }
    res.status(200).json({
      message: "Program successfully deleted",
      program_id: results.insertId,
    });
  });
};

/////////////
exports.getPrograms = async (req, res, next) => {
  const query = "SELECT * FROM gym.programs";
  db.query(query, (error, results) => {
    if (error) {
      res
        .status(400)
        .json({ message: "Error getting programs", error: error.message });
    }
    res
      .status(200)
      .json({ message: "Programs got successfully", programs: results.rows });
  });
};

//////////////
exports.getProgramById = async (req, res, next) => {
  const programId = req.params.id;
  const query = "SELECT * FROM gym.programs WHERE id = $1";
  db.query(query, [programId], (error, results) => {
    if (error) {
      res
        .status(400)
        .json({ message: "Error getting program", error: error.message });
    }
    res
      .status(200)
      .json({ message: "Program got successfully", program: results.rows[0] });
  });
};
