const {
  check
} = require('express-validator');

const teamNameCheck = check('teamName')
  .not()
  .isEmpty()
  .withMessage('Team name is required')

const teamManagerNameCheck = check('teamManagerName')
  .not()
  .isEmpty()
  .withMessage('Manager name is required')

const teamPlayersCheck = check('teamPlayers')
  .not()
  .isEmpty()
  .withMessage('Please this field is required')

module.exports = {
  teamNameCheck,
  teamPlayersCheck,
  teamManagerNameCheck
};