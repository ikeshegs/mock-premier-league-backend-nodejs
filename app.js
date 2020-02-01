const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

// Redis Session
const redisSession = require('./middlewares/session');

// Routes
const userRoute = require('./routes/user.route');
const teamRoute = require('./routes/team.route');
const fixtureRoute = require('./routes/fixture.route');
const searchTeamAndFixturesRoute = require('./routes/searchTeamAndFixtures.route');

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(redisSession);

app.use('/api/v1/auth', userRoute);
app.use('/api/v1', teamRoute);
app.use('/api/v1', fixtureRoute);
app.use('/api/v1', searchTeamAndFixturesRoute);

app.get('/', (req, res) => {
  if (req.session.key) {
    return;
  } else {
    // else go to home page.
    return res
      .status(200)
      .send('Welcome to Mock Premier League Fixtures and Results. ');
  }
});

// Return status code 404 when requesting for unknown routes
app.get('*', (req, res) => {
  res.status(404).send('Page Not Found :(');
});

const port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log('Listening on port: ', port);
});

module.exports = app;
