const { Pool } = require("pg");
const dotenv = require("dotenv").config();

const db = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.HOST,
  port: process.env.DB_PORT,
  database: process.env.DATABASE,
});

module.exports = db;
