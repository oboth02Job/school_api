const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(404).json({
    message: "Unauthorized access",
  });
};

module.exports = isAuthenticated;
