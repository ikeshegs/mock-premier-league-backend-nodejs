const check = require('express-validator');

const emailCheck = check('email')
  .isEmail()
  .withMessage('Invalid Email Format: abcd@efg.xxx')

const nameCheck = check('name')
  .not()
  .isEmpty()
  .withMessage('Name is required')

const userNameCheck = check('username')
  .not()
  .isEmpty()
  .withMessage('Username is required')

const passwordCheck = check('password')
  .isLength({
    min: 8,
    max: 40
  })
  .withMessage('Password must be between 8 to 40 characters')
  .matches(/\d/)
  .withMessage('Password must contain one number')
  .matches(/\D/)
  .withMessage('Password must contain one alphabet')

const confirmPasswordCheck = check('confirmPassword')
  .custom((value, {
    req
  }) => {
    if (value !== req.body.password) {
      throw new Error('Password does not match');
    }
    return true;
  });

module.exports = {
  emailCheck,
  userNameCheck,
  nameCheck,
  passwordCheck,
  confirmPasswordCheck
};