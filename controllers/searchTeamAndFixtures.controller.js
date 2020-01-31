const { db } = require('../database');
const customValidator = require('../middlewares/validatorErrors');
const capitalize = require('../helpers/capitalizeTeamName');

class SearchTeamAndFixture {
  static async search(req, res) {
    const validator = customValidator(req);

    if (validator.error) {
      return res.status(400).json({
        status: 400,
        error: validator.error
      });
    }

    let {
      teamName
    } = req.params;
    // Capitalize the first letter
    teamName = capitalize(teamName);
    try {
      const text = 'SELECT * FROM teams WHERE team_name = $1;';
      const value = [teamName]

      const checkTeam = await db.query(text, value);
      if (checkTeam.rowCount < 1) {
        return res.status(404).send({
          status: 'error',
          error: 'Team not found',
        });
      }

      const searchText = 'SELECT * FROM fixtures WHERE home_team = $1 OR away_team = $1;';
      const searchValue = [teamName];

      const getTeamFixtures = await db.query(searchText, searchValue);
      return res.status(200).json({
        status: 'success',
        teamName,
        data: getTeamFixtures.rows
      })
    } catch (error) {
      return res.status(400).json({
        status: 'error',
        message: error.message
      });
    }
  }
}

module.exports = SearchTeamAndFixture;