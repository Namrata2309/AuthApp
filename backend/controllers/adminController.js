/**
 * @route   GET /api/admin
 * @desc    Admin-only endpoint
 * @access  Private (ADMIN)
 */
exports.getAdminPanel = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Admin Panel",
    admin: {
      id: req.session.userId,
      name: req.session.userName,
      role: req.session.userRole,
    },
  });
};
