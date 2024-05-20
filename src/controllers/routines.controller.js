const dotenv = require("dotenv").config();
const db = require("../db");
const nodemailer = require("nodemailer");

///////////////

const sendNewRoutineEmail = (
  email,
  firstname,
  lastname,
  name,
  user_calendar
) => {
  const EMAIL = process.env.USERMAIL;
  const PASSWORD = process.env.PASSMAIL;

  let config = {
    service: "gmail",
    auth: {
      user: EMAIL,
      pass: PASSWORD,
    },
  };

  let transporter = nodemailer.createTransport(config);

  const htmlContent = `
  <html>
    <head>
    </head>
    <body>
      <div>
      <h1>Hi! Your new ${name} routine for Gym'App</h1>
      <a href="https://ibb.co/XYGsgdY"><img src="https://i.ibb.co/xFrj0cF/logo.jpg" alt="logo" border="0"></a>
      <h2>Welcome to the gym!</h2>
      <p>Hello ${firstname} ${lastname}! 
      
      Your new ${name} routine for ${user_calendar} has been created successfully!
      
      See you soon at the gym!
      
      The Gym'App Team</p>
      
      <h2>We look forward to seeing you! 💪</h2>
      </div>
    </body>
  </html>
`;

  let message = {
    from: EMAIL,
    to: email,
    subject: `Your new ${name} routine from Gym'App `,
    html: htmlContent,
  };

  transporter
    .sendMail(message)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error("Error sending email", error);
    });
};

//////////////

exports.createRoutine = async (req, res, next) => {
  const { programId, name, description, userCalendar } = req.body;
  const query =
    "INSERT INTO gym.routines (program_id, name, description, user_calendar) VALUES ($1, $2, $3, $4) RETURNING id";
  const values = [programId, name, description, userCalendar];
  db.query(query, values, (error, results, fields) => {
    if (error) {
      return res
        .status(400)
        .json({ message: "Create routine failed", error: error.message });
    }
    const response = results.rows[0].id;
    sendNewRoutineEmail(
      req.user.email,
      req.user.firstname,
      req.user.lastname,
      name,
      userCalendar
    );
    return res
      .status(201)
      .json({ message: "Routine created successfully", routine: response });
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
  const { name, description, userCalendar } = req.body;
  const id = req.params.id;
  const query =
    "UPDATE gym.routines SET name=$1, description=$2, user_calendar=$3 WHERE id=$4";
  const values = [name, description, userCalendar, id];
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

exports.routineByProgramId = async (req, res, next) => {
  const { programId } = req.params;
  const query = "SELECT * FROM gym.routines WHERE program_id = $1";
  db.query(query, [programId], (error, results, fields) => {
    if (error) {
      return res
        .status(400)
        .json({ message: "Routines not found", error: error.message });
    }
    if (!results || !results.rows) {
      return res
        .status(404)
        .json({ message: "No routines found for this program" });
    }
    return res
      .status(200)
      .json({ message: "Get routines successfully", routines: results.rows });
  });
};
