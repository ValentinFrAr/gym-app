const nodemailer = require("nodemailer");
const db = require("../db");

/////////////

const sendNewProgramEmail = (email, firstname, lastname, name , duration_program) => {
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
      <h1>Hi! There is a message from Gym'App</h1>
      <a href="https://ibb.co/XYGsgdY"><img src="https://i.ibb.co/xFrj0cF/logo.jpg" alt="logo" border="0"></a>
      <h2>Welcome to the gym!</h2>
      <p>Hello ${firstname} ${lastname}! 
      
      Your ${name} program of ${duration_program} has been created successfully!
      
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
    subject: "Your New Training Program from Gym'App ",
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

exports.createProgram = async (req, res, next) => {
  const { name, description, weekly_routine, duration_program, firstname, lastname, email } = req.body;
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
    sendNewProgramEmail(email, firstname, lastname, name , duration_program)
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
