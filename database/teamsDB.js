const {
  pool
} = require('./');

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
  process.exit(0);
});

module.exports = {
  createTeamTable,
  dropTeamTable
};

// eslint-disable-next-line import/no-extraneous-dependencies
require('make-runnable');