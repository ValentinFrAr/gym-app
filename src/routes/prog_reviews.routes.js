const express = require("express");
const {
  createProgramReview,
  getProgramReview,
  getAllProgramsReviews,
  updateProgramReview,
  deleteProgramReview,
} = require("../controllers/prog_reviews.controller");
const { private } = require("../middleware/private");

const router = express.Router();
//example:  router.route("/route").method(function);//
router.route("/get-program-review/:id").get(private, getProgramReview);
router
  .route("/get-all-programs-reviews/:id")
  .get(private, getAllProgramsReviews);
router.route("/create-program-review").post(private, createProgramReview);
router.route("/update-program-review/:id").put(private, updateProgramReview);
router.route("/delete-program-review/:id").delete(private, deleteProgramReview);

module.exports = router;
