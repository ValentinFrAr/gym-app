const express = require("express");
const router = express.Router();

router.use("", require("./routes/auth.routes"));
router.use("", require("./routes/plans.routes"));
router.use("", require("./routes/recipes.routes"));
router.use("", require("./routes/programs.routes"));
router.use("", require("./routes/fav.programs.routes"));
router.use("", require("./routes/exercises.routes"));
router.use("", require("./routes/routines.routes"));
router.use("", require("./routes/routine.exercises.routes"));
router.use("", require("./routes/prog_reviews.routes"));
router.use("", require("./routes/fav.exercises.routes"));
router.use("", require("./routes/fav.recipes.routes"));

module.exports = router;
