const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const createAdmin = require("./models");
// createAdmin;
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
app.listen(5000);
console.log("Server on port 5000");
