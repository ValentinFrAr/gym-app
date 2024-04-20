const express = require("express");
const {
  createProgram,
  modificateProgram,
  deleteProgram,
  getPrograms,
  getProgramById,
} = require("../controllers/programs.controller");
const { private } = require("../middleware/private");
const router = express.Router();

router.route("/create-program/:id").post(private, createProgram);
router.route("/modificate-program/:id").put(private, modificateProgram);
router.route("/delete-program/:id").delete(private, deleteProgram);
router.route("/get-all-programs").get(getPrograms);
router.route("/get-program/:id").get(getProgramById);

module.exports = router;
