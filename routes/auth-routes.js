//  Dependencies
const router = require("express").Router();
const passport = require("passport");

//  Define our auth routes
router.get(
  "/twitch",
  passport.authenticate("twitch", { scope: ["user_read"] })
);

router.get("/twitch/redirect", passport.authenticate("twitch"), (req, res) => {
  res.redirect(`/frand/${req.user.name}`);
});

//  Log out
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
