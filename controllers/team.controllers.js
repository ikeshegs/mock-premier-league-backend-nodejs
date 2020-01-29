const db = require('../database');
const customValidator = require('../middlewares/validatorErrors');

class Team {
  static async createTeam(req, res) {
    const validator = customValidator(req);

    if (validator.error) {
      return res.status(400).json({
        status: 400,
        error: validator.error
      });
    }

    // Authorized user(Admin)
    const decodedUser = req.user;

    if (decodedUser.isAdmin === 'true') {
      const {
        teamName,
        teamManagerName,
        teamPlayers
      } = req.body;

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
            status: 201,
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
            status: 409,
            message: 'Team name already exists'
          });
          return;
        }

        return res.status(400).send({
          status: 400,
          message: error.message
        });
      }
    }
    return res.status(401).json({
      status: 401,
      message: 'Unauthorized Access'
    })
  }

  static async deleteTeam(req, res) {
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
            status: 'error',
            error: 'Team not found',
          });
        }

        const deleteText = 'DELETE FROM teams WHERE team_id = $1';
        const deleteValue = [id];

        const deleted = await db.query(deleteText, deleteValue);

        if (deleted.rows.length === 0) {
          return res.status(200).json({
            status: 'deleted successfully',
            message: 'Team deleted successfully'
          });
        }
      } catch (error) {
        return res.status(400).json({
          status: 'error',
          message: error.message
        });
      }
    }
  }

  static async getAllTeams(req, res) {
    const decodedUser = req.user;

    if (decodedUser) {
      try {
        const text = 'SELECT * FROM teams';
        const result = await db.query(text);
        return res.status(200).json({
          status: 'Success',
          data: result.rows
        })
      } catch (error) {
        return res.status(400).json({
          status: 'error',
          message: error.message
        })
      }
    }
  }

  static async getTeam(req, res) {
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
            status: 'error',
            error: 'Team not found',
          });
        }

        const selectText = 'SELECT * FROM teams WHERE team_id = $1';
        const selectValue = [id];

        const selected = await db.query(selectText, selectValue);

        return res.status(200).json({
          status: 'successful',
          data: selected.rows[0]
        });
      } catch (error) {
        return res.status(400).json({
          status: 'error',
          message: error.message
        })
      }
    }
  }

  static async editTeam(req, res) {
    const validator = customValidator(req);
    if (validator.error) {
      return res.status(400).json({
        status: 400,
        error: validator.error
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
        if (checkTeam.rowCount < 1) {
          return res.status(404).json({
            status: 'error',
            error: 'Team not found',
          });
        }

        // Update team information
        const editText = `UPDATE teams SET team_manager=$2, players=$3, modified_date=$4 WHERE team_id=$1 RETURNING *;`;
        const editValue = [
          id, 
          teamManagerName, 
          teamPlayers,
          new Date()
        ];

        const edited = await db.query(editText, editValue);
        if (edited) {
          return res.status(200).json({
            status: 'successful',
            data: edited.rows[0]
          });
        }
      } catch (error) {
        return res.status(400).json({
          status: 'error',
          message: error.message
        });
      }
    }
  }
}

module.exports = Team;