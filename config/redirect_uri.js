if (process.env.NODE_ENV == "staging") {
  module.exports = {
    redirect_uri:
      "https://twitch-streamer-logos-stage.herokuapp.com/auth/twitch/redirect"
  };
} else if (process.env.NODE_ENV == "production") {
  module.exports = {
    redirect_uri:
      "https://twitch-streamer-logos.herokuapp.com/auth/twitch/redirect"
  };
} else {
  module.exports = {
    redirect_uri: "http://localhost:5000/auth/twitch/redirect"
  };
}
