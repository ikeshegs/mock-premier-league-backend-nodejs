const express = require('express');

const auth = require('../helpers/auth');

// Validators
const {
  homeTeamNameCheck,
  homeTeamScorersCheck,
  homeTeamScoreCheck,
  awayTeamNameCheck,
  awayTeamScoreCheck,
  awayTeamScorersCheck,
  statusCheck
} = require('../middlewares/validators/fixture.validator');
const {
  idCheck
} = require('../middlewares/validators/params.validator');

// Controllers
const Fixture = require('../controllers/fixture.controller');

fixtureRoute = express.Router();

fixtureRoute.post('/fixtures', auth.verifyToken, [homeTeamNameCheck, awayTeamNameCheck], Fixture.createFixture);

fixtureRoute.delete('/fixtures/:id', auth.verifyToken, [idCheck], Fixture.deleteFixture);

fixtureRoute.put('/fixtures/:id', auth.verifyToken, [homeTeamScoreCheck, homeTeamScorersCheck, awayTeamScoreCheck, awayTeamScorersCheck], Fixture.editFixture);

fixtureRoute.get('/fixtures', auth.verifyToken, Fixture.getAllFixtures);

fixtureRoute.get('/fixtures/status', auth.verifyToken, [statusCheck], Fixture.getFixturesByStatus);

fixtureRoute.get('/fixtures/:id', auth.verifyToken, [idCheck], Fixture.getFixture);


module.exports = fixtureRoute;