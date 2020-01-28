const express = require('express');

// validators
const {
  nameCheck,
  passwordCheck,
  confirmPasswordCheck,
  emailCheck
} = require('../middlewares/validators/user-validator');

// controllers
const User = require('../controllers/user-controllers');

const userRoute = express();

userRoute.post('/api/v1/auth/users', [emailCheck, nameCheck, passwordCheck, confirmPasswordCheck], User.signUp);


module.exports = userRoute;