const express = require('express');

const auth = require('../helpers/auth');

// validators
const { teamNameCheck, teamPlayersCheck, teamManagerNameCheck } = require('../middlewares/validators/team.validator');

// controllers
const team = require('../controllers/team.controllers');

const teamRoute = express();

teamRoute.post('/api/v1/teams', [teamNameCheck, teamPlayersCheck, teamManagerNameCheck], auth.verifyToken, team.createTeam);

module.exports = teamRoute;

