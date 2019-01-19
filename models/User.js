const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  twitchId: String,
  displayName: String,
  name: String,
  avatar: String,
  logo: String
});

const User = mongoose.model("user", UserSchema);

module.exports = User;