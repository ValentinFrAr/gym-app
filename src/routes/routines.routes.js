const express = require("express");
const {
  createRoutine,
  getRoutine,
  updateRoutine,
  deleteRoutine,
  getAllRoutines,
  routineByProgramId,
} = require("../controllers/routines.controller");
const { private } = require("../middleware/private");

const router = express.Router();
//example:  router.route("/route").method(function);//
router.route("/create-routine").post(private, createRoutine);
router.route("/get-routine/:id").get(getRoutine);
router.route("/update-routine/:id").put(private, updateRoutine);
router.route("/delete-routine/:id").delete(private, deleteRoutine);
router.route("/get-all-routines").get(getAllRoutines);
router.route("/get-routine-by-program/:programId").get(routineByProgramId);

module.exports = router;
