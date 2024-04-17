const express = require("express");
const { createProgramReview, getProgramReview, getAllProgramsReviews, updateProgramReview, deleteProgramReview } = require("../controllers/prog_reviews.controller");
const router = express.Router();
//example:  router.route("/route").method(function);//
router.route("/get-program-review/:id").get(getProgramReview);
router.route("/get-all-programs-reviews/:id").get(getAllProgramsReviews);
router.route("/create-program-review").post(createProgramReview);
router.route("/update-program-review/:id").put(updateProgramReview);
router.route("/delete-program-review/:id").delete(deleteProgramReview);


module.exports = router;
