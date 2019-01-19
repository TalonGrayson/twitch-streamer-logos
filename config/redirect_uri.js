switch (process.env.NODE_ENV) {
  case "staging":
    module.exports = {
      redirect_uri:
        "https://twitch-streamer-logos-stage.herokuapp.com/auth/twitch/redirect"
    };
    break;
  case "production":
    module.exports = {
      redirect_uri:
        "https://twitch-streamer-logos.herokuapp.com/auth/twitch/redirect"
    };
    break;
  default:
    module.exports = {
      redirect_uri: "http://localhost:5000/auth/twitch/redirect"
    };
    break;
}
