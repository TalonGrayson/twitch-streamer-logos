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
router.get("/:streamer", authCheck, (req, res) => {
  User.findOne({ name: req.params.streamer.trim().toLowerCase() }).then(
    streamer => {
      if (streamer) {
        //  If the user is logged in and this is their profile
        if (req.user && req.user.id === streamer.id) {
          res.send("This is your profile");
        } else {
          //  They're either not logged in, or they're logged in but it's not their profile
          res.send("This is not your profile");
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
        res.redirect(streamer.avatar);
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
          res.redirect(streamer.logo);
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