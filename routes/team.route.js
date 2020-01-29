const express = require('express');

const auth = require('../helpers/auth');

// validators
const { teamNameCheck, teamPlayersCheck, teamManagerNameCheck } = require('../middlewares/validators/team.validator');
const idCheck = require('../middlewares/validators/idParams.validator');

// controllers
const team = require('../controllers/team.controllers');

const teamRoute = express();

teamRoute.post('/api/v1/teams', auth.verifyToken, [teamNameCheck, teamPlayersCheck, teamManagerNameCheck], team.createTeam);

teamRoute.delete('/api/v1/teams/:id', auth.verifyToken, [idCheck], team.deleteTeam);

teamRoute.get('/api/v1/teams', auth.verifyToken, team.getAllTeams);

teamRoute.get('/api/v1/teams/:id', auth.verifyToken, [idCheck], team.getTeam);

teamRoute.put('/api/v1/teams/:id', auth.verifyToken, [teamManagerNameCheck, teamPlayersCheck], team.editTeam);

module.exports = teamRoute;

