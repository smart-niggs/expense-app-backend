const dotenv = require('dotenv');
dotenv.config();


module.exports = {
  envMode: process.env.NODE_ENV,
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  token_expires_in: process.env.TOKEN_EXPIRES_IN
}