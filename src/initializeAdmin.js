const bcrypt = require("bcryptjs"); // Importa el módulo bcrypt para el hash de contraseñas
const db = require("./db"); // Importa el módulo de conexión a la base de datos

const initializeAdmin = async () => {
  // Define una función asíncrona llamada initializeAdmin
  try {
    const query = "SELECT COUNT(*) FROM gym.users"; // Consulta para contar el número de usuarios en la tabla
    const result = await db.query(query); // Ejecuta la consulta y espera el resultado
    const rowCount = parseInt(result.rows[0].count); // Obtiene el número de filas de la consulta

    // Si la tabla de usuarios está vacía, inserta un usuario administrador
    if (rowCount === 0) {
      const adminUser = {
        // Define los datos del usuario administrador
        firstname: "Admin",
        lastname: "User",
        phone: "123456789",
        sex: "M",
        email: "admin@admin.com",
        address: "Admin Address",
        birthday: "1990-01-01", // Fecha de nacimiento ficticia
        password: "adminPassword", // Deberías generar un hash para la contraseña real
        is_admin: true, // Establece el indicador de administrador en true
      };

      // Hash de la contraseña del usuario administrador
      const hashedPassword = await bcrypt.hash(adminUser.password, 10);
      adminUser.password = hashedPassword; // Reemplaza la contraseña en texto plano por el hash

      // Inserta el usuario administrador en la base de datos
      const insertQuery =
        "INSERT INTO gym.users (firstname, lastname, phone, sex, email, address, birthday, password, is_admin) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)";
      const insertValues = Object.values(adminUser); // Obtiene los valores del objeto usuario administrador
      await db.query(insertQuery, insertValues); // Ejecuta la consulta de inserción en la base de datos

      console.log("Admin successfully created!");
    }
  } catch (error) {
    console.error("Error creating admin:", error);
  }
};

module.exports = initializeAdmin;
