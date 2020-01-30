const {
  check
} = require('express-validator');

const idCheck = (req, res, next) => {
  const {
    id
  } = req.params;

  if (isNaN(id)) {
    return res.status(400).json({
      status: 400,
      error: 'Invalid ID'
    });
  }
  return next();
}

const nameParamCheck = check('teamName')
  .not()
  .isEmpty()
  .withMessage('Team name is required')
  .matches(/\D/)
  .withMessage('Team Name should be in alphabets')

module.exports = {idCheck, nameParamCheck};