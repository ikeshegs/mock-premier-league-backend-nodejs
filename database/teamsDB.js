const {
  Pool
} = require('pg');
const dotenv = require('dotenv');

const env = process.env.NODE_ENV;

dotenv.config();

const pool = env === 'test'? new Pool({connectionString: process.env.TEST_DB_URL }) : new Pool({connectionString: process.env.DB_URL });

pool.on('connect', () => {
  console.log('connected to the db');
});

/**
 * Create Team Table
 */
const createTeamTable = () => {
  const queryText =
    `CREATE TABLE IF NOT EXISTS
      teams(
        team_id SERIAL PRIMARY KEY,
        team_name VARCHAR(70) NOT NULL UNIQUE,
        team_manager VARCHAR(60) NOT NULL,
        players VARCHAR(255) NOT NULL,
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
 * Drop Team Table
 */
const dropTeamTable = () => {
  const queryText = 'DROP TABLE IF EXISTS teams';
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
  createTeamTable,
  dropTeamTable
};

// eslint-disable-next-line import/no-extraneous-dependencies
require('make-runnable');