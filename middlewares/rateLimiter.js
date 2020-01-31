require('dotenv').config();
const rateLimit = require("express-rate-limit");


const limiter = rateLimit({
  windowMs: 60000,
  max: process.env.CALL_PER_MINUTE || 10,
  message: {
    error: "Too many requests"
  }
});

module.exports = limiter;