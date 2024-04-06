const dotenv = require("dotenv").config();
const jwt = require("jsonwebtoken");

/////// Private route - verify Token ///////

exports.private = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token)
      return res
        .status(401)
        .json({ message: "There´s no token, access denied" });

    jwt.verify(token, process.env.jwtSecret, (error, user) => {
      if (error) {
        return res.status(401).json({ message: "Invalid token" });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

/////// Private route for Admin - verify Token ///////

exports.privateAdmin = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token)
      return res
        .status(401)
        .json({ message: "There´s no token, access denied" });

    jwt.verify(token, process.env.jwtSecret, (error, user) => {
      if (error) {
        return res.status(401).json({ message: "Invalid token" });
      }
      if (!user.is_admin) {
        return res.status(403).json({ message: "Access denied, only admin!" });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
