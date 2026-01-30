exports.authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.session.userRole)) {
      return res.render("error", {
        message: "Access denied",
      });
    }
    next();
  };
};
