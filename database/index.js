const { Pool } = require ('pg');
const dotenv = require('dotenv');

const env = process.env.NODE_ENV;

dotenv.config();

// const pool = env === 'test'? new Pool({connectionString: process.env.DB_TEST_HOST || process.env.TEST_DB_URL }) : new Pool({connectionString: process.env.DB_PROD_HOST || process.env.DB_URL });
const pool = env === 'test'? new Pool({connectionString: process.env.TEST_DB_URL }) : new Pool({connectionString: process.env.DB_URL });

pool.on('connect', () => {
  console.log('connected to the db');
});

const db = {
  /**
   * DB Query
   * @param {object} req
   * @param {object} res
   * @returns {object} object 
   */
  query(text, params){
    return new Promise((resolve, reject) => {
      pool.query(text, params)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      })
    })
  }
}

module.exports = { db, pool};