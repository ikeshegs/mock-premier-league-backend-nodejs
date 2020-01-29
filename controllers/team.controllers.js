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
}

module.exports = Team;