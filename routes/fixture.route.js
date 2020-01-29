const express = require('express');

const auth = require('../helpers/auth');

// Validators
const {
  homeTeamNameCheck,
  homeTeamScorersCheck,
  homeTeamScoreCheck,
  awayTeamNameCheck,
  awayTeamScoreCheck,
  awayTeamScorersCheck
} = require('../middlewares/validators/fixture.validator');
const idCheck = require('../middlewares/validators/idParams.validator');

// Controllers
const Fixture = require('../controllers/fixture.controller');

fixtureRoute = express();

fixtureRoute.post('/api/v1/fixtures', auth.verifyToken, [homeTeamNameCheck, awayTeamNameCheck], Fixture.createFixture);

module.exports = fixtureRoute;