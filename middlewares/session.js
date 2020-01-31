require('dotenv').config();
const redis = require('redis');
const session = require('express-session');
const redisStore = require('connect-redis')(session);
const client = redis.createClient();

const redisSession = session({
  secret: process.env.REDIS_SECRET,
  store: new redisStore({
    host: process.env.REDIS_HOST || 'localhost',
    port: 6379,
    client: client,
    ttl: 1000
  }),
  saveUninitialized: false,
  resave: false
});

module.exports = redisSession;