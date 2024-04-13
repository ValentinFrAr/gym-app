const express = require("express");
const {
  createRoutine,
  getRoutine,
  updateRoutine,
  deleteRoutine,
  getAllRoutines,
} = require("../controllers/routines.controller");
const router = express.Router();
//example:  router.route("/route").method(function);//
router.route("/create-routine").post(createRoutine);
router.route("/get-routine/:id").get(getRoutine);
router.route("/update-routine/:id").put(updateRoutine);
router.route("/delete-routine/:id").delete(deleteRoutine);
router.route("/get-all-routines").get(getAllRoutines);

module.exports = router;
