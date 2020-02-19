const bcrypt = require('bcrypt');

const {
  db
} = require('../database');
const customValidator = require('../middlewares/validatorErrors');
const auth = require('../helpers/auth');

class USER {
  /**
   * Create A User
   * @param {object} req 
   * @param {object} res
   * @returns {object}
   */
  async signUp(req, res) {
    const validator = customValidator(req);

    if (validator.error) {
      return res.status(400).json({
        error: true,
        message: validator.error
      });
    }

    let {
      name,
      email,
      password,
      isAdmin
    } = req.body;
    const salt = bcrypt.genSaltSync(10);

    // Hash user password
    const hash = await bcrypt.hashSync(password, salt);

    const text = `INSERT INTO users(name, email, password, is_admin, created_date, modified_date) VALUES($1, $2, $3, $4, $5, $6) returning *`;
    const values = [
      name,
      email,
      hash,
      isAdmin,
      new Date(),
      new Date()
    ];

    try {
      const data = await db.query(text, values);
      if (data) {
        const token = auth.createToken(data.rows[0]);
        const {
          id,
          name,
          email,
          is_admin,
          password
        } = data.rows[0];
        return res.status(201).json({
          error: false,
          message: 'User created successfully',
          data: {
            token,
            id,
            name,
            email,
            isAdmin: is_admin
          }
        })
      }
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        res.status(409).json({
          error: true,
          message: 'Email already exists'
        });
      }

      // if (error) {
      //   res.status(400).json({
      //     error: true,
      //     message: error.message
      //   });
      // }
    }
  }

  /**
   * Login A User
   * @param {object} req 
   * @param {object} res
   * @returns {object}
   */

  async loginUser(req, res) {
    const validator = customValidator(req);

    if (validator.error) {
      return res.status(400).json({
        error: true,
        message: validator.error
      });
    }

    const {
      email,
      password
    } = req.body;

    const text = `SELECT * FROM users WHERE email = $1`;
    const values = [email];

    try {
      const data = await db.query(text, values);
      if (data) {
        const comparePassword = bcrypt.compareSync(password, data.rows[0].password);

        if (!comparePassword) {
          return res.status(400).json({
            error: true,
            message: 'Invalid user details'
          });
        }

        const {
          name,
          email,
          is_admin
        } = data.rows[0];
        // Set the sessions value
        // req.session.key = data.rows[0];

        const token = auth.createToken(data.rows[0]);
        return res.status(200).json({
          error: false,
          message: 'User login successful',
          data: {
            token,
            name,
            email,
            isAdmin: is_admin
          }
        })
      }
    } catch (error) {
      res.status(404).json({
        error: true,
        message: 'User not found'
      });
    }
  }

  async logoutUser(req, res) {
    if (req.session.key) {
      req.session.destroy(function () {
        res.redirect('/');
      });
    } else {
      res.redirect('/');
    }
  }
}

const user = new USER();

module.exports = user;