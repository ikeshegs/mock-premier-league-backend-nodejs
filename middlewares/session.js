const dotenv = require('dotenv');
const redis = require('redis');
const session = require('express-session');
const redisStore = require('connect-redis')(session);
const client  = redis.createClient();

dotenv.config()

const redisSession = session({
  secret: process.env.REDIS_SECRET,
  store: new redisStore({ host: 'localhost', port: 6379, client: client, ttl: 1000}),
  saveUninitialized: false,
  resave: false
});

module.exports = redisSession;