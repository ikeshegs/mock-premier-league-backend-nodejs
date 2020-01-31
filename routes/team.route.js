const express = require('express');

const auth = require('../helpers/auth');

// validators
const {
  teamNameCheck,
  teamPlayersCheck,
  teamManagerNameCheck
} = require('../middlewares/validators/team.validator');
const {
  idCheck
} = require('../middlewares/validators/params.validator');

// controllers
const team = require('../controllers/team.controllers');

const teamRoute = express.Router();

teamRoute.post('/teams', auth.verifyToken, [teamNameCheck, teamPlayersCheck, teamManagerNameCheck], team.createTeam);

teamRoute.delete('/teams/:id', auth.verifyToken, [idCheck], team.deleteTeam);

teamRoute.get('/teams', auth.verifyToken, team.getAllTeams);

teamRoute.get('/teams/:id', auth.verifyToken, [idCheck], team.getTeam);

teamRoute.put('/teams/:id', auth.verifyToken, [teamManagerNameCheck, teamPlayersCheck], team.editTeam);

module.exports = teamRoute;