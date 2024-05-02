const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const initializeAdmin = require("./initializeAdmin");
const { private } = require("./middleware/private");
const insertExercisesToDB = require("./api.exercices");
const routes = require("./routes");
const path = require("path");

dotenv.config();
const uploadDir = path.join(__dirname, "./uploads");
app.use("/uploads", express.static(uploadDir));

app.use(morgan("dev"));
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use(cookieParser());
app.get("/api/private", private, (req, res) =>
  res.json({
    user: req.user,
  })
);

app.use("/api", routes);

//Llamar la función para crear un admin
initializeAdmin();
// Insert exercices in DB
insertExercisesToDB();

app.listen(5000);
console.log("Server on port 5000");
