const {
  Pool
} = require('pg');
const dotenv = require('dotenv');

dotenv.config();

let connectionString;
if (process.env.NODE_ENV === 'test') {
  connectionString = process.env.TEST_DB_URL;
} else if (process.env.NODE_ENV === 'production') {
  connectionString = process.env.PROD_DB_URL;
} else {
  connectionString = process.env.DB_URL;
}


const pool = new Pool({
  connectionString
});

pool.on('connect', () => {
  console.log('connected to the db');
});

/**
 * Create Fixture Table
 */
const createFixtureTable = () => {
  const queryText =
    `CREATE TABLE IF NOT EXISTS
      fixtures(
        fixture_id SERIAL PRIMARY KEY,
        home_team VARCHAR(70) NOT NULL,
        away_team VARCHAR(60) NOT NULL,
        home_team_scorers VARCHAR(200),
        away_team_scorers VARCHAR(200),
        home_team_score INT,
        away_team_score INT,
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
 * Drop Fixture Table
 */
const dropFixtureTable = () => {
  const queryText = 'DROP TABLE IF EXISTS fixtures';
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
  process.exit(0);
});

module.exports = {
  createFixtureTable,
  dropFixtureTable
};

// eslint-disable-next-line import/no-extraneous-dependencies
require('make-runnable');