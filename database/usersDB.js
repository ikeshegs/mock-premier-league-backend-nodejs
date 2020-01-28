const {
  Pool
} = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DB_URL
});

pool.on('connect', () => {
  console.log('connected to the db');
});

/**
 * Create User Table
 */
const createUserTable = () => {
  const queryText =
    `CREATE TABLE IF NOT EXISTS
      users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(70) NOT NULL,
        email VARCHAR(60) NOT NULL UNIQUE,
        password VARCHAR(100) NOT NULL,
        is_admin VARCHAR(10) NOT NULL,
        created_date TIMESTAMP,
        modified_date TIMESTAMP
      )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

/**
 * Drop User Table
 */
const dropUserTable = () => {
  const queryText = 'DROP TABLE IF EXISTS users';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

pool.on('remove', () => {
  console.log('User removed');
  process.exit(0);
});

module.exports = {
  createUserTable,
  dropUserTable
};

// eslint-disable-next-line import/no-extraneous-dependencies
require('make-runnable');