const express = require("express");
const router = express.Router();
const {
  createUser,
  login,
  updateUser,
  deleteUser,
  getUserById,
  getAllUsers,
} = require("../controllers/auth.controller");

router.route("/register").post(createUser);
router.route("/login").post(login);
router.route("/update/:id").put(updateUser);
router.route("/delete/:id").delete(deleteUser);
router.route("/user/:id").get(getUserById);
router.route("/users").get(getAllUsers);

module.exports = router;
