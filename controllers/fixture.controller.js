const { db } = require('../database');
const customValidator = require('../middlewares/validatorErrors');

class Fixture {
  static async createFixture(req, res) {
    // if (req.session.key) {
      const validator = customValidator(req);
      if (validator.error) {
        return res.status(400).json({
          error: true,
          message: validator.error
        });
      }

      // Authorized User(Admin)
      const decodedUser = req.user;
      if (decodedUser.isAdmin === 'true') {
        const {
          homeTeamName,
          awayTeamName
        } = req.body;
        const status = 'pending';

        try {
          // Check if home team name and away team name exists
          const checkText = 'SELECT * FROM teams';
          let checkData = await db.query(checkText)
          checkData = checkData.rows;

          const teamNames = Object.values(checkData)

          // Team names stored in an array
          let names = [];
          teamNames.forEach((name) => {
            if (name.team_name) {
              names.push(name.team_name)
            }
          })
          if (names.includes(homeTeamName) && names.includes(awayTeamName)) {
            const insertQuery = `INSERT INTO fixtures(home_team, away_team, status, created_date, modified_date) VALUES($1, $2, $3, $4, $5) returning *`;
            const insertValues = [
              homeTeamName,
              awayTeamName,
              status,
              new Date(),
              new Date()
            ];

            const data = await db.query(insertQuery, insertValues);
            if (data) {
              const {
                fixture_id,
                home_team,
                away_team,
                status
              } = data.rows[0];
              return res.status(201).json({
                error: false,
                message: 'Fixture created successfully',
                data: {
                  fixtureId: fixture_id,
                  homeTeamName: home_team,
                  awayTeamName: away_team,
                  status
                }
              });
            }
          }
          return res.status(400).json({
            error: true,
            message: 'Please check your inputs, one of the teams is not in the database.'
          });
        } catch (error) {
          return res.status(400).send({
            error: true,
            message: error.message
          });
        }
      }
    // } else {
    //   res.redirect("/");
    // }
  }

  static async deleteFixture(req, res) {
    // if (req.session.key) {
      const decodedUser = req.user;
      const {
        id
      } = req.params;

      if (decodedUser.isAdmin === 'true') {
        try {
          const text = 'SELECT * FROM fixtures WHERE fixture_id = $1';
          const value = [id]

          const checkFixture = await db.query(text, value);
          if (checkFixture.rowCount < 1) {
            return res.status(404).send({
              error: true,
              message: 'Fixture not found',
            });
          }

          const deleteText = 'DELETE FROM fixtures WHERE fixture_id = $1';
          const deleteValue = [id];

          const deleted = await db.query(deleteText, deleteValue);

          if (deleted.rows.length === 0) {
            return res.status(200).json({
              error: false,
              message: 'Fixture deleted'
            });
          }
        } catch (error) {
          return res.status(400).json({
            error: true,
            message: error.message
          });
        }
      }
    // } else {
    //   res.redirect("/");
    // }
  }

  static async editFixture(req, res) {
    // if (req.session.key) {
      const validator = customValidator(req);
      if (validator.error) {
        return res.status(400).json({
          error: true,
          message: validator.error
        });
      }

      const decodedUser = req.user;
      const {
        id
      } = req.params;

      if (decodedUser.isAdmin === 'true') {
        const {
          homeTeamScorers,
          awayTeamScorers,
          homeTeamScore,
          awayTeamScore
        } = req.body;
        const status = 'completed';

        try {
          // Check if the team is in the database
          const findFixtureText = 'SELECT * FROM fixtures WHERE fixture_id = $1';
          const findFixtureValue = [id]

          const checkFixture = await db.query(findFixtureText, findFixtureValue);
          const {
            home_team,
            away_team
          } = checkFixture.rows[0];
          if (checkFixture.rowCount < 1) {
            return res.status(404).json({
              error: true,
              message: 'Fixture not found',
            });
          }

          // Update Fixture information
          const editText = `UPDATE fixtures SET home_team=$2, away_team=$3, home_team_scorers=$4, away_team_scorers=$5, home_team_score=$6, away_team_score=$7, status=$8, modified_date=$9 WHERE fixture_id=$1 RETURNING *;`;
          const editValue = [
            id,
            home_team,
            away_team,
            homeTeamScorers,
            awayTeamScorers,
            homeTeamScore,
            awayTeamScore,
            status,
            new Date()
          ];

          const edited = await db.query(editText, editValue);
          if (edited) {
            return res.status(200).json({
              error: false,
              message: 'Fixture updated',
              data: edited.rows[0]
            });
          }
        } catch (error) {
          return res.status(400).json({
            error: true,
            message: error.message
          });
        }
      }
    // } else {
    //   res.redirect("/");
    // }
  }

  static async getAllFixtures(req, res) {
    // if (req.session.key) {
      const decodedUser = req.user;
      if (decodedUser) {
        try {
          const text = 'SELECT * FROM fixtures';
          const result = await db.query(text);
          return res.status(200).json({
            error: false,
            message: 'All fixtures retrieved successfully',
            data: result.rows
          })
        } catch (error) {
          return res.status(400).json({
            error: true,
            message: error.message
          })
        }
      }
    // } else {
    //   res.redirect("/");
    // }
  }

  static async getFixture(req, res) {
    // if (req.session.key) {
      const decodedUser = req.user;
      const {
        id
      } = req.params;

      if (decodedUser) {
        try {
          const text = 'SELECT * FROM fixtures WHERE fixture_id = $1';
          const value = [id]

          const checkFixture = await db.query(text, value);
          if (checkFixture.rowCount < 1) {
            return res.status(404).send({
              error: true,
              message: 'Fixture not found',
            });
          }

          return res.status(200).json({
            error: false,
            message: 'fixture retrieved successfully',
            data: checkFixture.rows[0]
          });
        } catch (error) {
          return res.status(400).json({
            error: true,
            message: error.message
          })
        }
      }
    // } else {
    //   res.redirect("/");
    // }
  }

  static async getFixturesByStatus(req, res) {
    // if (req.session.key) {
      const validator = customValidator(req);
      if (validator.error) {
        return res.status(400).json({
          error: true,
          message: validator.error
        });
      }

      const decodedUser = req.user;
      // status will either be "pending" or "completed"
      const {
        status
      } = req.body;
      if (decodedUser) {
        try {
          const text = 'SELECT * FROM fixtures WHERE status = $1'
          const value = [status]

          const fixtures = await db.query(text, value);
          return res.status(200).json({
            error: false,
            message: 'success',
            data: fixtures.rows
          })
        } catch (error) {
          return res.status(400).json({
            error: true,
            message: error.message
          })
        }
      }
    // } else {
    //   res.redirect("/");
    // }
  }
}

module.exports = Fixture;