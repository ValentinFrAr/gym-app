const dotenv = require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");

exports.createUser = async (req, res, next) => {
  const {
    username,
    firstname,
    lastname,
    dni,
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
      "INSERT INTO gym.user (username, firstname, lastname, dni, sex, email, address, birthday, password) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)";

    const values = [
      username,
      firstname,
      lastname,
      dni,
      sex,
      email,
      address,
      birthday,
      hash,
    ];

    db.query(query, values, (error, results, fields) => {
      if (error) {
        return res
          .status(400)
          .json({ message: "Error creando user", error: error.message });
      }

      const maxAge = 3 * 60 * 60;
      const token = jwt.sign(
        { username, firstname, lastname, dni, sex, email, address, birthday },
        process.env.JwtSecret,
        {
          expiresIn: maxAge,
        }
      );

      res.cookie("token", token, {
        httpOnly: true,
        maxAge: maxAge * 1000,
      });

      res.status(201).json({
        message: "User creado exitosamente",
        patient: results.insertId,
      });
    });
  });
};

/////////////////////////

exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  const query = "SELECT * FROM gym.user WHERE username = $1";
  const values = [username];

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
      console.log(password, user.password, result);
      console.log(user);
      if (result) {
        const maxAge = 3 * 60 * 60;
        const token = jwt.sign(
          {
            id: user.id,
            dni: user.dni,
            email: user.email,
            sex: user.sex,
            firstname: user.firstname,
            lastname: user.lastname,
            address: user.address,
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
          users: results.rows,
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
