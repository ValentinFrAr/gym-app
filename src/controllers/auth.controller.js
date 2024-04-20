const dotenv = require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");
const nodemailer = require("nodemailer");

///////////
const sendConfirmationCreatedAccountEmail = (email, firstname, lastname) => {
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
      <h1>Welcome to Gym'App</h1>
      <a href="https://ibb.co/XYGsgdY"><img src="https://i.ibb.co/xFrj0cF/logo.jpg" alt="logo" border="0"></a>
      <h2>Welcome to the gym!</h2>
      <p>Hello ${firstname} ${lastname}! 
      Welcome to our gym! Now that you've signed up, you're one step closer to reaching your fitness goals. In our community, you'll have access to a variety of services and activities designed to help you become your best self.
      
      From scheduling your training sessions to exploring our personalized training programs, special treatments, and tracking your progress, we're here to support you every step of the way.
      
      We hope your experience with us is exciting, motivating, and full of achievements! Feel free to approach the gym staff if you need assistance or have any questions.
      
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
    subject: "Welcome to our gym! ",
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

///////////////

const sendConfirmationDeletedAccount = async (email, firstname, lastname) => {
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
  <h1>Account Deletion Confirmation Gym'App</h1>
  <a href="https://ibb.co/XYGsgdY"><img src="https://i.ibb.co/xFrj0cF/logo.jpg" alt="logo" border="0"></a>
  <h2>User Deleted Successfully</h2>
  <p>Hello ${firstname} ${lastname}! 
  Your account has been successfully deleted from our system. We want to thank you for being part of our gym community. While we're sad to see you go, we understand that circumstances change, and we respect your decision.
  
  If you ever decide to return, we'll be here to welcome you back with open arms. In the meantime, we wish you all the best in your fitness journey and in everything you do.
  
  If you have any questions or need further assistance, please don't hesitate to reach out to our gym staff.
  
  Take care, and best wishes for the future!
  
  The Gym'App Team</p>
  
  <h2>We look forward to seeing you again! 💪</h2>
  </div>
</body>
</html>

  `;

  let message = {
    from: EMAIL,
    to: email,
    subject: "Account Deletion Confirmation",
    html: htmlContent,
  };

  transporter
    .sendMail(message)
    .then(() => {
      console.log("email sent");
    })
    .catch((error) => {
      console.error("Error sending email", error);
    });
};

///////////////////////// REGISTER

exports.createUser = async (req, res, next) => {
  const {
    firstname,
    lastname,
    phone,
    sex,
    email,
    address,
    birthday,
    password,
  } = req.body;

  bcrypt.hash(password, 10, async (err, hash) => {
    if (err) {
      return res.status(500).json({ message: "Error hashing password" });
    }

    const query =
      "INSERT INTO gym.users (firstname, lastname, phone, sex, email, address, birthday, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id";

    const values = [
      firstname,
      lastname,
      phone,
      sex,
      email,
      address,
      birthday,
      hash,
    ];

    db.query(query, values, async (error, userResults) => {
      if (error) {
        return res
          .status(400)
          .json({ message: "Error creating user", error: error.message });
      }
      const userId = userResults.rows[0].id;

      // Insert a new row into the 'plan' table with 'inactive' status
      const planQuery = "INSERT INTO gym.plans (user_id, plan) VALUES ($1, $2)";
      const planValues = [userId, "inactive"];

      try {
        await db.query(planQuery, planValues);
      } catch (err) {
        return res
          .status(500)
          .json({ message: "Error creating plan", error: err.message });
      }

      sendConfirmationCreatedAccountEmail(email, firstname, lastname);

      res.status(201).json({
        message: "User created successfully",
      });
    });
  });
};

///////////////////////// 

const sendConfirmationUpdatedAccountEmail = (email, firstname, lastname) => {
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
      
      Your account data has been updated successfully!
      
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
    subject: "A message from Gym'App ",
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

///////////////////////// LOGIN

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  const query = "SELECT * FROM gym.users WHERE email = $1";
  const values = [email];

  db.query(query, values, (error, results) => {
    if (error) {
      return res
        .status(400)
        .json({ message: "Error al iniciar sesion", error: error.message });
    }

    const user = results.rows[0];

    if (!user) {
      return res.status(500).json({ message: "Datos incorrectos" });
    }

    if (!user.password) {
      return res.status(500).json({ message: "Contraseña no disponible" });
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.status(500).json({ message: "Contraseña invalida" });
      }
      if (result) {
        const maxAge = 3 * 60 * 60;
        const token = jwt.sign(
          {
            id: user.id,
            phone: user.phone,
            email: user.email,
            sex: user.sex,
            firstname: user.firstname,
            lastname: user.lastname,
            address: user.address,
            is_admin: user.is_admin,
          },
          process.env.jwtSecret,
          {
            expiresIn: maxAge,
          }
        );
        res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: maxAge * 1000,
        });
        return res.status(201).json({
          message: "Inicio de sesion exitoso",
          status: 201,
          // user: results.rows,
          token: token,
        });
      } else {
        console.log("Password comparison failed:", err); // Add this line

        return res
          .status(400)
          .json({ message: "Datos incorrectos", error: err });
      }
    });
  });
};

///////////////////////// UPDATE ///////////////////

exports.updateUser = async (req, res, next) => {
  const { email, phone, address, is_admin, password, firstname, lastname } = req.body;
  const id = req.params.id;
  try {
    let hash = password ? await bcrypt.hash(password, 10) : null;
    const query =
      "UPDATE gym.users SET email = $1, phone = $2, address = $3, is_admin = $4" +
      (hash ? ", password = $5" : "") +
      " WHERE id = $6";
    const values = hash
      ? [email, phone, address, is_admin, hash, id]
      : [email, phone, address, is_admin, id];
    await db.query(query, values);
    return res
      .status(201)
      .json({ message: "User updated successfully", user: id });
  } catch (error) {

    sendConfirmationUpdatedAccountEmail(email, firstname, lastname);
    return res.status(500).json({
      message: "Error updating user",
      error: error.message,
    });
  }
};

///////////////////////// DELETE ////////////////

exports.deleteUser = async (req, res, next) => {
  const id = req.params.id;
  const { email, firstname, lastname } = req.body;
  const deleteUserQuery = "DELETE FROM gym.users WHERE id = $1";
  const deletePlansQuery = "DELETE FROM gym.plans WHERE user_id = $1";

  try {
    // Eliminar el usuario y el plan asociado
    await db.query(deletePlansQuery, [id]);
    await db.query(deleteUserQuery, [id]);
    sendConfirmationDeletedAccount(email, firstname, lastname);

    // Enviar una respuesta exitosa al cliente
    res.status(200).json({
      message: "User and associated plan deleted successfully",
      id: id,
    });
  } catch (error) {
    // Manejar cualquier error que ocurra durante las consultas
    res.status(400).json({
      message: "Error deleting user and associated plan",
      error: error.message,
    });
  }
};

//////////////////////// GET USER BY ID  //////////////////

exports.getUserById = async (req, res, next) => {
  const id = req.params.id;
  const query = "SELECT * FROM gym.users WHERE id = $1";
  const values = [id];

  await db.query(query, values, (error, results, fields) => {
    if (error) {
      return res
        .status(400)
        .json({ message: "User not found", error: error.message });
    }
    const token = jwt.sign(
      {
        user: results.rows[0],
      },
      process.env.jwtSecret
    );
    // const user = results.rows[0];
    return res
      .status(200)
      .json({ message: "User getting successfully", token });
  });
};

////////////////////// GET ALL USERS

exports.getAllUsers = async (req, res, next) => {
  const query = "SELECT * FROM gym.users";

  db.query(query, (error, results, fields) => {
    if (error) {
      res.status(400).json({ message: "User not found", error: error.message });
    }
    res.status(200).json(results.rows);
  });
};
