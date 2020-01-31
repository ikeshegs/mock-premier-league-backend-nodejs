const express = require('express');

// validators
const {
  nameCheck,
  passwordCheck,
  confirmPasswordCheck,
  emailCheck
} = require('../middlewares/validators/user.validator');

// controllers
const User = require('../controllers/user.controllers');

// rate limiter
const limiter = require('../middlewares/rateLimiter');

const userRoute = express.Router();

userRoute.post('/api/v1/auth/signup', limiter, [emailCheck, nameCheck, passwordCheck, confirmPasswordCheck], User.signUp);

userRoute.post('/api/v1/auth/login', limiter, [emailCheck, passwordCheck], User.loginUser);

userRoute.get('/api/v1/auth/logout', User.logoutUser);

module.exports = userRoute;