const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const authRoutes = require("./routes/auth-routes");
const apiRoutes = require("./routes/api-routes");
const passport = require("passport");
const passportSetup = require("./config/passport-setup");
const cookieSession = require("cookie-session");

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
  })
);

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

//  Routes
app.use("/auth", authRoutes);
app.use("/frand", apiRoutes);

app.get("/", (req, res) => {
  res.json({ THREE6TEEN: "Hogan" });
});

app.listen(port, () => {
  console.log(`App is listening on ${port}...`);
});
