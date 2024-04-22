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
const { privateAdmin, private } = require("../middleware/private");

router.route("/register").post(createUser);
router.route("/login").post(login);
router.route("/update/:id").put(private, updateUser);
router.route("/delete/:id").delete(privateAdmin, deleteUser);
router.route("/user/:id").get(private, getUserById);
router.route("/users").get(privateAdmin, getAllUsers);

module.exports = router;
