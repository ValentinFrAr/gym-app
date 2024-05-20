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

    try {
      const userQuery =
        "INSERT INTO gym.users (firstname, lastname, phone, sex, email, address, birthday, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id";
      const userValues = [
        firstname,
        lastname,
        phone,
        sex,
        email,
        address,
        birthday,
        hash,
      ];
      const userResult = await db.query(userQuery, userValues);
      const userId = userResult.rows[0].id;

      let photoUrl;
      if (sex === "M") {
        photoUrl =
          "https://www.francetvinfo.fr/pictures/RMhC9HFG1bBrXoJnqazwfd9KOSI/fit-in/720x/2019/04/12/hub_super01_cvr_1500_5b3e561f3788f5.51606704.jpg";
      }
      if (sex === "F") {
        photoUrl =
          "https://www.mundodeportivo.com/alfabeta/hero/2023/11/wonder-woman.1698964414.6042.jpg?width=1200";
      }

      const userPhotoQuery =
        "INSERT INTO gym.user_photos (user_id, photo_url) VALUES ($1, $2)";
      const userPhotoValues = [userId, photoUrl];
      await db.query(userPhotoQuery, userPhotoValues);

      const planQuery = "INSERT INTO gym.plans (user_id, plan) VALUES ($1, $2)";
      const planValues = [userId, "inactive"];
      await db.query(planQuery, planValues);

      sendConfirmationCreatedAccountEmail(email, firstname, lastname);

      res.status(201).json({
        message: "User created successfully",
      });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({
        message: "Error creating user",
        error: error.message,
      });
    }
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

///////////////////////// UPDATE

exports.updateUser = async (req, res, next) => {
  const { email, phone, address, is_admin, password, firstname, lastname } =
    req.body;
  const id = req.params.id;

  try {
    let hash = password ? await bcrypt.hash(password, 10) : null;

    let updateFields = "email = $1, phone = $2, address = $3, is_admin = $4";
    let values = [email, phone, address, is_admin];

    if (hash) {
      updateFields += ", password = $5";
      values.push(hash);
    }

    const query = `UPDATE gym.users SET ${updateFields} WHERE id = $${
      values.length + 1
    }`;
    values.push(id);

    await db.query(query, values);

    sendConfirmationUpdatedAccountEmail(email, firstname, lastname);

    return res
      .status(201)
      .json({ message: "User updated successfully", user: id });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error updating user", error: error.message });
  }
};

///////////////////////// DELETE ////////////////

exports.deleteUser = async (req, res, next) => {
  const id = req.params.id;
  const deleteUserQuery = "DELETE FROM gym.users WHERE id = $1";
  const deletePlansQuery = "DELETE FROM gym.plans WHERE user_id = $1";

  try {
    // Eliminar el usuario y el plan asociado
    await db.query(deletePlansQuery, [id]);
    await db.query(deleteUserQuery, [id]);
    await sendConfirmationDeletedAccount(
      req.user.email,
      req.user.firstname,
      req.user.lastname
    );

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
  const id = req.user.id;
  const query =
    "SELECT * FROM gym.users JOIN gym.plans ON gym.users.id = gym.plans.user_id LEFT JOIN gym.user_photos ON gym.user_photos.user_id = gym.users.id WHERE gym.users.id = $1";
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
    return res
      .status(200)
      .json({ message: "User getting successfully", token });
  });
};

////////////////////// GET ALL USERS

exports.getAllUsers = async (req, res, next) => {
  const query =
    "SELECT * FROM gym.users JOIN gym.plans ON gym.users.id = gym.plans.user_id LEFT JOIN gym.user_photos ON gym.user_photos.user_id = gym.users.id";
  db.query(query, (error, results, fields) => {
    if (error) {
      res.status(400).json({ message: "User not found", error: error.message });
    }

    const codedData = jwt.sign(
      {
        users: results.rows,
      },
      process.env.jwtSecret
    );
    res.status(200).json({ codedData });
  });
};

///////////////////////////// IMAGES FUNCTIONS

exports.uploadPhoto = async (req, res) => {
  const userId = req.params.id;
  const { file } = req;

  if (!file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  try {
    const photoUrl = `${file.filename}`;

    const checkPhotoQuery = "SELECT * FROM gym.user_photos WHERE user_id = $1";
    const checkPhotoValues = [userId];
    const { rows } = await db.query(checkPhotoQuery, checkPhotoValues);

    if (rows && rows.length > 0) {
      const updatePhotoQuery =
        "UPDATE gym.user_photos SET photo_url = $1 WHERE user_id = $2";
      const updatePhotoValues = [photoUrl, userId];
      await db.query(updatePhotoQuery, updatePhotoValues);
    } else {
      const insertPhotoQuery =
        "INSERT INTO gym.user_photos (user_id, photo_url) VALUES ($1, $2)";
      const insertPhotoValues = [userId, photoUrl];
      await db.query(insertPhotoQuery, insertPhotoValues);
    }

    res.status(200).json({ message: "Photo updated successfully" });
  } catch (error) {
    console.error("Error updating photo:", error);
    res
      .status(500)
      .json({ message: "Error updating photo", error: error.message });
  }
};

// Middleware pour récupérer la photo de l'utilisateur
exports.getPhoto = async (req, res) => {
  const userId = req.params.id;
  const query = "SELECT photo_url FROM gym.user_photos WHERE id = $1";
  db.query(query, [userId], (error, results) => {
    if (error) {
      res
        .status(400)
        .json({ message: "Error getting user image", error: error.message });
    }
    res.status(200).json({ message: "Image got", photoUrl: results });
  });
};
