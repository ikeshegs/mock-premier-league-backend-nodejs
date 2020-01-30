const {
  check
} = require('express-validator');

const homeTeamNameCheck = check('homeTeamName')
  .not()
  .isEmpty()
  .withMessage('Home team name is required')
  .matches(/\D/)
  .withMessage('Home team name must be in alphabets')

const awayTeamNameCheck = check('awayTeamName')
  .not()
  .isEmpty()
  .withMessage('Away team name is required')
  .matches(/\D/)
  .withMessage('Away team name must be in alphabets')

const homeTeamScorersCheck = check('homeTeamScorers')
  .optional()

const awayTeamScorersCheck = check('awayTeamScorers')
  .optional()
// .not()
// .isEmpty()
// .withMessage('Away team scorers name is required')
// .matches(/\D/)
// .withMessage('Away team scorers name must be in alphabets')

const homeTeamScoreCheck = check('homeTeamScore')
  .not()
  .isEmpty()
  .withMessage('Home team score is required')
  .matches(/\d/)
  .withMessage('Home team score must be a number')

const awayTeamScoreCheck = check('awayTeamScore')
  .not()
  .isEmpty()
  .withMessage('Away team score is required')
  .matches(/\d/)
  .withMessage('Away team score must be a number')

const statusCheck = check('status')
  .not()
  .isEmpty()
  .withMessage('Status is required')
  .matches(/\D/)
  .withMessage('Status are in alphabets only')

module.exports = {
  homeTeamNameCheck,
  homeTeamScoreCheck,
  homeTeamScorersCheck,
  awayTeamNameCheck,
  awayTeamScoreCheck,
  awayTeamScorersCheck,
  statusCheck
};