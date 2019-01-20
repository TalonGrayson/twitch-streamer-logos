//  Dependencies
const passport = require("passport");
const TwitchStrategy = require("passport-twitch").Strategy;

//  Models
const User = require("../models/User");

//  Config
const keys = require("../config/keys");
const redirect_uri = require("../config/redirect_uri").redirect_uri;

//  Cookie bakery
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

//  Set up Twitch OAuth 2.0 Strategy
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
        //  If the user exists:
        //  Log their name in the console
        //  Check whether their profile needs to be updated
        //  Done

        if (currentUser) {
          console.log(`Existing User Found: ${currentUser.name}`);

          //  Check whether we need to update the user's profile
          if (
            currentUser !==
            {
              twitchId: profile.id,
              displayName: profile._json.display_name,
              name: profile._json.name,
              avatar: profile._json.logo,
              bio: profile._json.bio
            }
          ) {
            currentUser.displayName = profile._json.display_name;
            currentUser.name = profile._json.name;
            currentUser.avatar = profile._json.logo;
            currentUser.bio = profile._json.bio;
            currentUser.save();
          }

          done(null, currentUser);

          //  If the user does not exist in our database:
          //  Create and save a new user in our database
          //  Done
        } else {
          console.log(`User not found in database`);
          new User({
            twitchId: profile.id,
            displayName: profile._json.display_name,
            name: profile._json.name,
            avatar: profile._json.logo,
            bio: profile._json.bio
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
