const express = require("express");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const authRoutes = require("./routes/auth-routes");
const passport = require("passport");
const cookieSession = require("cookie-session");

const app = express();
const port = process.env.PORT || 5000;

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

app.listen(port, () => {
  console.log(`App is listening on ${port}...`);
});
