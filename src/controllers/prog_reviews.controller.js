const db = require("../db");

exports.createProgramReview = async (req, res, next) => {
    const { program_id, rating, comment , user_id } = req.body;
    const query =
      "INSERT INTO gym.program_reviews (program_id, rating, comment, user_id) VALUES ($1, $2, $3, $4)";
    const values = [program_id, rating, comment, user_id];
    db.query(query, values, (error, results, fields) => {
      if (error) {
        res
          .status(400)
          .json({ message: "Error creating review", error: error.message });
      };
      return res.status(201).json({ message: "Review created successfully" });
    });
  };

  exports.updateProgramReview = async (req, res, next) => {
    const id = req.params.id;
    const { rating, comment} = req.body;
    const query =
      "UPDATE gym.program_reviews SET rating=$1 , comment=$2 WHERE id=$3";
    const values = [rating, comment, id];
    db.query(query, values, (error, results, fields) => {
      if (error) {
        res
          .status(400)
          .json({ message: "Error updating review", error: error.message });
      };
      return res.status(200).json({ message: "Review updated successfully" });
    });
  };

  exports.deleteProgramReview = async (req, res, next) => {
    const id = req.params.id;
    const query =
      "DELETE FROM gym.program_reviews WHERE id=$1";
    const values = [id];
    db.query(query, values, (error, results, fields) => {
      if (error) {
        res
          .status(400)
          .json({ message: "Error deleting review", error: error.message });
      };
      return res.status(200).json({ message: "Review deleted successfully" });
    });
  };

  exports.getProgramReview = async (req, res, next) => {
    const id = req.params.id;
    const query =
      "SELECT * FROM gym.program_reviews WHERE id=$1";
    const values = [id];
    db.query(query, values, (error, results, fields) => {
      if (error) {
        res
          .status(400)
          .json({ message: "Review not found", error: error.message });
      };
      const result = results.rows[0]
      return res.status(200).json({ message: "Review founded successfully", result: result });
    });
  };

  exports.getAllProgramsReviews = async (req, res, next) => {
    const id = req.params.id;
    const query =
      "SELECT * FROM gym.program_reviews WHERE program_id=$1";
    const values = [id];
    db.query(query, values, (error, results, fields) => {
      if (error) {
        res
          .status(400)
          .json({ message: "No founded reviews", error: error.message });
      };
      const result = results.rows
      return res.status(200).json({ message: "Reviews loaded successfully", result: result });
    });
  };