const router = require("express").Router();
const express = require("express");
const passport = require("passport");
const TwitchStrategy = require("passport-twitch").Strategy;
const User = require("../models/User");
const keys = require("../config/keys");
const redirect_uri = require("../config/redirect_uri").redirect_uri;

const horrible = express();

//  Init passport
horrible.use(passport.initialize());
horrible.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

//  Define our auth routes
router.get(
  "/twitch",
  passport.authenticate("twitch", { scope: ["user_read"] })
);

router.get("/twitch/redirect", passport.authenticate("twitch"), (req, res) => {
  res.send("Authenticated");
});

//  Log out
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

//  Setting up Twitch OAuth 2.0
passport.use(
  new TwitchStrategy(
    {
      clientID: keys.twitch.TWITCH_CLIENT_ID,
      clientSecret: keys.twitch.TWITCH_CLIENT_SECRET,
      callbackURL: redirect_uri,
      scope: "user_read"
    },
    function(accessToken, refreshToken, profile, done) {
      //  Logging profile for reference (remove later)
      console.log(profile);

      //  Look for user in db
      User.findOne({ twitchId: profile.id }).then(currentUser => {
        //  If the user exists, log their name
        //  If not, create the user on mongoDB
        if (currentUser) {
          console.log(`Existing User Found: ${currentUser.name}`);
          horrible.get(`/${currentUser.name}`, (req, res) => {
            res.json(currentUser);
          });
          return;
          done(null, currentUser);
        } else {
          console.log(`User not found in database`);
          new User({
            twitchId: profile.id,
            displayName: profile._json.display_name,
            name: profile._json.name,
            avatar: profile._json.logo
          })
            .save()
            .then(newUser => {
              console.log(`New User Created: ${newUser.displayName}`);
              done(null, newUser);
            });
        }
      });
    }
  )
);

module.exports = router;
