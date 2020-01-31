require('dotenv').config();
const rateLimit = require("express-rate-limit");


const limiter = rateLimit({
  windowMs: 60 * 15 * 1000,
  max: process.env.CALL_PER_MINUTE,
  message: "Too many requests from this IP, please try again after 15 minutes"
});

module.exports = limiter;