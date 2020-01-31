const express = require('express');

// Validator
const { nameParamCheck } = require('../middlewares/validators/params.validator');

// Controller
const searchTeamAndFixtures = require('../controllers/searchTeamAndFixtures.controller');

const searchTeamAndFixturesRoute = express.Router();

searchTeamAndFixturesRoute.get('/search/:teamName', [nameParamCheck], searchTeamAndFixtures.search);

module.exports = searchTeamAndFixturesRoute;