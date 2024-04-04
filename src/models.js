const bcrypt = require("bcryptjs");
const db = require("../db");

exports.createAdmin = async (req, res, next) => {
    const password = "admin";
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        return res.status(500).json({ message: "Error hashing password" });
      }
  
      const queryCheck = "SELECT COUNT(*) AS count FROM gym.users";
      db.query(queryCheck, (error, results, fields) => {
        if (error) {
          return res.status(400).json({ message: "Error al verificar usuarios", error: error.message });
        }
      
        const count = results[0].count;
        if (count < 1) {
          const queryInsert = `INSERT INTO gym.users (firstname, lastname, phone, sex, email, address, birthday, is_admin, password) 
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`;
          const values = ['admin', 'admin', '12345', 'm', 'admin@admin.com', 'admin 123', '2000/12/31','true', hash];
      
          db.query(queryInsert, values, (error, results, fields) => {
            if (error) {
              return res.status(400).json({ message: "Error creando admin", error: error.message });
            }
            // Éxito al crear el admin
            return res.status(200).json({ message: "Admin creado exitosamente" });
          });
        } else {
          // Ya hay usuarios en la tabla, no es necesario insertar el admin
          return res.status(200).json({ message: "Ya existe al menos un usuario en la tabla" });
        }
      });
      
    });
  };