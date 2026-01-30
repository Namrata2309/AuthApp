const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/authController");

router.post("/api/auth/register", registerUser);
router.post("/api/auth/login", loginUser);
router.post("/api/auth/logout", logoutUser);

module.exports = router;
