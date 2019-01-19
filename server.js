const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const authRoutes = require("./routes/auth-routes");
const passport = require("passport");
const cookieSession = require("cookie-session");
const User = require("./models/User");

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
  })
);

app.use("/auth", authRoutes);

//  Init passport
app.use(passport.initialize());
app.use(passport.session());

mongoose
  .connect(
    `mongodb://${keys.mongo.MONGO_USERNAME}:${keys.mongo.MONGO_PASSWORD}@${
      keys.mongo.MONGO_ADDRESS
    }`,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.json({ THREE6TEEN: "Hogan" });
});

app.get("/api/:streamer", (req, res) => {
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

app.get("/api/:streamer/logo", (req, res) => {
  User.findOne({ name: req.params.streamer.trim().toLowerCase() }).then(
    streamer => {
      if (streamer) {
        res.send(streamer.avatar);
      } else {
        res
          .status(404)
          .send({ error: `We don't have that streamer in our database` });
      }
    }
  );
});

app.listen(port, () => {
  console.log(`App is listening on ${port}...`);
});
