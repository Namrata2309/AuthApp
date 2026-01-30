const User = require("../models/User");

/**
 * @route   GET /api/users
 * @desc    Get all users (ADMIN / protected)
 * @access  Private
 */
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // 🔐 exclude passwords

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching users",
    });
  }
};

/**
 * @route   GET /api/dashboard
 * @desc    Get dashboard data for logged-in user
 * @access  Private
 */
exports.getDashboard = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Dashboard data",
    user: {
      id: req.session.userId,
      name: req.session.userName,
      role: req.session.userRole,
    },
  });
};
