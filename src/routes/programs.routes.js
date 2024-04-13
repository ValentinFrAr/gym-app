const express = require("express");
const {
  createProgram,
  modificateProgram,
  deleteProgram,
} = require("../controllers/programs.controller");
const router = express.Router();

router.route("/create-program/:id").post(createProgram);
router.route("/modificate-program/:id").put(modificateProgram);
router.route("/delete-program/:id").delete(deleteProgram);

module.exports = router;
