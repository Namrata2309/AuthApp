const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getDashboard,
} = require("../controllers/userController");

const { isAuthenticated } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

router.get("/api/users", isAuthenticated, authorizeRoles("ADMIN"), getAllUsers);
router.get("/api/dashboard", isAuthenticated, getDashboard);

module.exports = router;
