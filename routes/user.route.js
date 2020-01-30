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

const userRoute = express.Router();

userRoute.post('/api/v1/auth/signup', [emailCheck, nameCheck, passwordCheck, confirmPasswordCheck], User.signUp);

userRoute.post('/api/v1/auth/login', [emailCheck, passwordCheck], User.loginUser);

userRoute.get('/api/v1/auth/logout', User.logoutUser);

module.exports = userRoute;