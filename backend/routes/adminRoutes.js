const express = require("express");
const router = express.Router();

const { getAdminPanel } = require("../controllers/adminController");
const { isAuthenticated } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

router.get(
  "/api/admin",
  isAuthenticated,
  authorizeRoles("ADMIN"),
  getAdminPanel
);

module.exports = router;
