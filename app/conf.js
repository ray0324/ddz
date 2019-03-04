require('dotenv').config();

module.exports = {
  PORT: process.env.PORT,
  APP_SECRET: process.env.APP_SECRET,
  MONGODB_HOST: process.env.MONGODB_HOST
};
