//  Dependencies
const router = require("express").Router();

//  Models
const User = require("../models/User");

const authCheck = (req, res, next) => {
  if (!req.user) {
    // if user is not logged in
    console.log("You are not logged in");
    next();
  } else {
    // you are logged in
    console.log("You are logged in");
    next();
  }
};

//  Get the streamer's profile
router.get("/:streamer", (req, res) => {
  User.findOne({ name: req.params.streamer.trim().toLowerCase() }).then(
    streamer => {
      if (streamer) {
        //  If the user is logged in and this is their profile
        //  Include their Twitch ID in the JSON
        if (req.user && req.user.id === streamer.id) {
          res.json({
            yourProfile: true,
            twitchId: streamer.twitchId,
            name: streamer.name,
            displayName: streamer.displayName,
            bio: streamer.bio,
            avatar: streamer.avatar,
            logo: streamer.logo ? streamer.logo : streamer.avatar
          });
        } else if (req.user) {
          //  They're logged in but it's not their profile
          res.json({
            yourProfile: false,
            name: streamer.name,
            displayName: streamer.displayName,
            bio: streamer.bio,
            avatar: streamer.avatar,
            logo: req.user.logo ? req.user.logo : req.user.avatar
          });
        } else {
          //  They're not logged in
          res.json({
            yourProfile: true,
            twitchId: streamer.twitchId,
            name: streamer.name,
            displayName: streamer.displayName,
            bio: streamer.bio,
            avatar: streamer.avatar,
            logo: streamer.logo ? streamer.logo : streamer.avatar
          });
        }
      } else {
        res
          .status(404)
          .send({ error: `We don't have that streamer in our database` });
      }
    }
  );
});

//  Get the streamer's profile
router.get("/:streamer/json", (req, res) => {
  User.findOne({ name: req.params.streamer.trim().toLowerCase() }).then(
    streamer => {
      if (streamer) {
        res.json(streamer);
      } else {
        res
          .status(404)
          .send({ error: `We don't have that streamer in our database` });
      }
    }
  );
});

//  Get the streamer's avatar
router.get("/:streamer/avatar", (req, res) => {
  User.findOne({ name: req.params.streamer.trim().toLowerCase() }).then(
    streamer => {
      if (streamer) {
        res.json(streamer.avatar);
      } else {
        res
          .status(404)
          .send({ error: `We don't have that streamer in our database` });
      }
    }
  );
});

//  Get the streamer's logo
router.get("/:streamer/logo", (req, res) => {
  User.findOne({ name: req.params.streamer.trim().toLowerCase() }).then(
    streamer => {
      if (streamer) {
        if (streamer.logo) {
          res.json(streamer.logo);
        } else {
          res
            .status(404)
            .send({ error: `We don't have a logo for that streamer` });
        }
      } else {
        res
          .status(404)
          .send({ error: `We don't have that streamer in our database` });
      }
    }
  );
});

//  Get the streamer's display name
router.get("/:streamer/displayname", (req, res) => {
  User.findOne({ name: req.params.streamer.trim().toLowerCase() }).then(
    streamer => {
      if (streamer) {
        if (streamer.logo) {
          res.json({ displayName: streamer.displayName });
        } else {
          res
            .status(404)
            .send({ error: `We don't have a logo for that streamer` });
        }
      } else {
        res
          .status(404)
          .send({ error: `We don't have that streamer in our database` });
      }
    }
  );
});

//  Get the streamer's bio
router.get("/:streamer/bio", (req, res) => {
  User.findOne({ name: req.params.streamer.trim().toLowerCase() }).then(
    streamer => {
      if (streamer) {
        if (streamer.logo) {
          res.json({ bio: streamer.bio });
        } else {
          res
            .status(404)
            .send({ error: `We don't have a logo for that streamer` });
        }
      } else {
        res
          .status(404)
          .send({ error: `We don't have that streamer in our database` });
      }
    }
  );
});

module.exports = router;
