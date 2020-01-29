const db = require('../database');
const customValidator = require('../middlewares/validatorErrors');

class Fixture {
  static async createFixture(req, res) {
    const validator = customValidator(req);
    if (validator.error) {
      return res.status(400).json({
        status: 400,
        error: validator.error
      });
    }

    // Authorized User(Admin)
    const decodedUser = req.user;

    if (decodedUser.isAdmin === 'true') {
      const {
        homeTeamName,
        awayTeamName
      } = req.body;

      try {
        // Check if home team name and away team name exists
        const checkText = 'SELECT team_name FROM teams WHERE'

        const insertQuery = `INSERT INTO fixtures(home_team, away_team, created_date, modified_date) VALUES($1, $2, $3, $4) returning *`;
        const insertValues = [
          homeTeamName,
          awayTeamName,
          new Date(),
          new Date()
        ];

        const data = await db.query(insertQuery, insertValues);
        if (data) {
          const {
            fixture_id,
            home_team,
            away_team,
          } = data.rows[0];
          return res.status(201).json({
            status: 'Success',
            data: {
              fixtureId: fixture_id,
              homeTeamName: home_team,
              awayTeamName: away_team
            }
          });
        }
      } catch (error) {
        return res.status(400).send({
          status: 400,
          message: error.message
        });
      }
    }
  }
}

module.exports = Fixture;