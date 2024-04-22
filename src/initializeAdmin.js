const bcrypt = require("bcryptjs"); // Importa el módulo bcrypt para el hash de contraseñas
const db = require("./db"); // Importa el módulo de conexión a la base de datos

const initializeAdmin = async () => {
  try {
    // Consulta para contar el número de usuarios en la tabla
    const query = "SELECT COUNT(*) FROM gym.users";
    const result = await db.query(query);
    const rowCount = parseInt(result.rows[0].count);

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
        birthday: "1990-01-01",
        password: "adminPassword", //generar un hash
        is_admin: true,
      };

      // Hash de la contraseña del usuario administrador
      const hashedPassword = await bcrypt.hash(adminUser.password, 10);
      adminUser.password = hashedPassword; // Reemplaza la contraseña en texto plano por el hash

      // Inserta el usuario administrador en la base de datos
      const insertQuery =
        "INSERT INTO gym.users (firstname, lastname, phone, sex, email, address, birthday, password, is_admin) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id";
      const insertValues = Object.values(adminUser); // Obtiene los valores del objeto usuario administrador
      const userResult = await db.query(insertQuery, insertValues); // Ejecuta la consulta de inserción en la base de datos
      const userId = userResult.rows[0].id; // Obtiene el ID del usuario administrador recién creado

      // Inserta una nueva fila en la tabla 'plans' con el plan 'premium' para el administrador
      const insertPlanQuery =
        "INSERT INTO gym.plans (user_id, plan) VALUES ($1, $2)";
      const insertPlanValues = [userId, "premium"];
      await db.query(insertPlanQuery, insertPlanValues);

      console.log("Admin successfully created with premium plan!");
    }
  } catch (error) {
    console.error("Error creating admin:", error);
  }
};

module.exports = initializeAdmin;
