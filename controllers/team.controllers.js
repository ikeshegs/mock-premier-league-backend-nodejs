const db = require('../database');
const customValidator = require('../middlewares/validatorErrors');
const capitalize = require('../helpers/capitalizeTeamName');

class Team {
  static async createTeam(req, res) {
    if (req.session.key) {
      const validator = customValidator(req);

      if (validator.error) {
        return res.status(400).json({
          error: true,
          message: validator.error
        });
      }

      const decodedUser = req.user;

      // Authorized user(Admin)
      if (decodedUser.isAdmin === 'true') {
        let {
          teamName,
          teamManagerName,
          teamPlayers
        } = req.body;

        // Capitalize the first letter
        teamName = capitalize(teamName);

        const text = `INSERT INTO teams(team_name, team_manager, players, created_date, modified_date) VALUES($1, $2, $3, $4, $5) returning *`;
        const values = [
          teamName,
          teamManagerName,
          teamPlayers,
          new Date(),
          new Date()
        ];

        try {
          const data = await db.query(text, values);
          if (data) {
            const {
              team_id,
              team_name,
              team_manager,
              players
            } = data.rows[0];
            return res.status(201).json({
              error: false,
              message: 'Team created successfully',
              data: {
                teamId: team_id,
                teamName: team_name,
                teamManager: team_manager,
                players
              }
            })
          }
        } catch (error) {
          if (error.routine === '_bt_check_unique') {
            res.status(409).json({
              error: true,
              message: 'Team name already exists'
            });
            return;
          }

          return res.status(400).send({
            error: true,
            message: error.message
          });
        }
      }
      return res.status(401).json({
        error: true,
        message: 'Unauthorized Access'
      })
    } else {
      res.redirect('/');
    }
  }

  static async deleteTeam(req, res) {
    if (req.session.key) {
      const decodedUser = req.user;
      const {
        id
      } = req.params;

      if (decodedUser.isAdmin === 'true') {
        try {
          const text = 'SELECT * FROM teams WHERE team_id = $1';
          const value = [id]

          const checkTeam = await db.query(text, value);
          if (checkTeam.rowCount < 1) {
            return res.status(404).send({
              error: true,
              message: 'Team not found',
            });
          }

          const deleteText = 'DELETE FROM teams WHERE team_id = $1';
          const deleteValue = [id];

          const deleted = await db.query(deleteText, deleteValue);

          if (deleted.rows.length === 0) {
            return res.status(200).json({
              error: false,
              message: 'Team deleted successfully'
            });
          }
        } catch (error) {
          return res.status(400).json({
            error: true,
            message: error.message
          });
        }
      } else {
        res.redirect('/');
      }
    }
  }

  static async getAllTeams(req, res) {
    if (req.session.key) {
      const decodedUser = req.user;
      if (decodedUser) {
        try {
          const text = 'SELECT * FROM teams';
          const result = await db.query(text);
          return res.status(200).json({
            error: false,
            data: result.rows
          })
        } catch (error) {
          return res.status(400).json({
            error: true,
            message: error.message
          })
        }
      }
    } else {
      res.redirect("/");
    }
  }

  static async getTeam(req, res) {
    if (req.session.key) {
      const decodedUser = req.user;
      const {
        id
      } = req.params;

      if (decodedUser) {
        try {
          const text = 'SELECT * FROM teams WHERE team_id = $1';
          const value = [id]

          const checkTeam = await db.query(text, value);
          if (checkTeam.rowCount < 1) {
            return res.status(404).send({
              error: true,
              message: 'Team not found',
            });
          }

          return res.status(200).json({
            error: false,
            data: checkTeam.rows[0]
          });
        } catch (error) {
          return res.status(400).json({
            error: true,
            message: error.message
          })
        }
      }
    } else {
      res.redirect("/");
    }
  }

  static async editTeam(req, res) {
    if (req.session.key) {
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
          teamManagerName,
          teamPlayers
        } = req.body;

        try {
          // Check if the team is in the database
          const findTeamText = 'SELECT * FROM teams WHERE team_id = $1';
          const findTeamValue = [id]

          const checkTeam = await db.query(findTeamText, findTeamValue);
          const {
            team_name
          } = checkTeam.rows[0];
          if (checkTeam.rowCount < 1) {
            return res.status(404).json({
              error: true,
              message: 'Team not found',
            });
          }

          // Update team information
          const editText = `UPDATE teams SET team_name=$2 team_manager=$3, players=$4, modified_date=$5 WHERE team_id=$1 RETURNING *;`;
          const editValue = [
            id,
            team_name,
            teamManagerName,
            teamPlayers,
            new Date()
          ];

          const edited = await db.query(editText, editValue);
          if (edited) {
            return res.status(200).json({
              error: false,
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
    } else {
      res.redirect("/");
    }
  }
}

module.exports = Team;