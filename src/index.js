const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const initializeAdmin = require("./initializeAdmin");
const { private } = require("./middleware/private");

dotenv.config();
app.use(morgan("dev"));
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);
app.use(cookieParser());
app.use("/api", require("./routes/auth.routes"));
app.get("/api/private", private, (req, res) =>
  res.json({
    user: req.user,
  })
);

//Llamar la función para crear un admin
initializeAdmin();

app.listen(5000);
console.log("Server on port 5000");
