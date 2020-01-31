const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
const redis = require('redis');
const session = require('express-session');
const redisStore = require('connect-redis')(session);
const client  = redis.createClient();

dotenv.config();

function generateValidToken(userObject) {
  return jwt.sign(userObject , process.env.JWT_KEY).toString();
}

module.exports = generateValidToken;