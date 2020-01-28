const bcrypt = require('bcrypt');

const db = require('../database');
const customValidator = require('../middlewares/validatorErrors');
const auth = require('../helpers/auth');

class USER {
  async signUp(req, res) {
    let {name, email, password, isAdmin} = req.body;
    const salt = bcrypt.genSaltSync(10);

    if (isAdmin === undefined) {
      isAdmin = false;
    }

    const validator = customValidator(req);

    if (validator.error) {
      return res.status(400).json({
        status: 400,
        error: validator.error
      });
    }

    const hash = await bcrypt.hashSync(password, salt, (err, result) => {
      if (err) {
        return err;
      }
      return result;
    });

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
          status: 201,
          data: {
            message: 'User created successfully',
            token,
            id,
            name,
            email,
            isAdmin: is_admin,
            password
          }
        })
      }
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        res.status(409).json({
          status: 409,
          error: 'Email already exists'
        });
        return;
      }

      if (error) {
        res.status(400).json({
          status: 400,
          error: error.message
        });
      }
    }
  }
}

const user = new USER();

module.exports = user;