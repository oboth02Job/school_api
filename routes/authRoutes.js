const express = require("express");
const passport = require("passport");

const router = express.Router();

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
);

router.get("/profile", (req, res) => {
  if (!req.isAuthenticated || !req.isAuthenticated()) {
    return res.status(401).json({
      error: "Not authenticated",
      user: req.user,
    });
  }

  res.json({
    user: req.user,
    authenticated: true,
  });
});

router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/login",
  }),
  (req, res) => {
    res.redirect("/auth/profile");
  },
);

router.get("/logout", (req, res) => {
  req.logout(() => {
    res.json({
      message: "Logout Successful",
    });
  });
});

module.exports = router;
