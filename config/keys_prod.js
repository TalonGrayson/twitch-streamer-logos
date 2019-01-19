module.exports = {
  twitch: {
    TWITCH_CLIENT_ID: process.env.TWITCH_CLIENT_ID,
    TWITCH_CLIENT_SECRET: process.env.TWITCH_CLIENT_SECRET
  },
  mongo: {
    MONGO_USERNAME: process.env.MONGO_USERNAME,
    MONGO_PASSWORD: process.env.MONGO_PASSWORD,
    MONGO_ADDRESS: process.env.MONGO_ADDRESS
  },
  session: {
    cookieKey: process.env.COOKIE_KEY
  }
};
