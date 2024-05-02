const express = require("express");
const router = express.Router();
const {
  createUser,
  login,
  updateUser,
  deleteUser,
  getUserById,
  getAllUsers,
  uploadPhoto,
  getPhoto,
} = require("../controllers/auth.controller");
const upload = require("../config/multerConfig");
const { privateAdmin, private } = require("../middleware/private");

router.route("/register").post(createUser);
router.route("/login").post(login);
router.route("/update/:id").put(private, updateUser);
router.route("/delete/:id").delete(privateAdmin, deleteUser);
router.route("/user").get(private, getUserById);
router.route("/users").get(privateAdmin, getAllUsers);
router.route("/update-photo/:id").post(upload.single("photo"), uploadPhoto);
router.get("/get-photo/:id", getPhoto);

module.exports = router;
