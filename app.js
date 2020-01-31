const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

// Redis Session
const redisSession = require('./middlewares/session');

// Routes
const userRoute = require('./routes/user.route');
const teamRoute = require('./routes/team.route');
const fixtureRoute = require('./routes/fixture.route')
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

app.use(userRoute);
app.use(teamRoute);
app.use(fixtureRoute);
app.use(searchTeamAndFixturesRoute);

app.get('/', (req, res) => {
  if (req.session.key) {
    return;
  } else {
    // else go to home page.
    return res
      .status(200)
      .send('Welcome to Mock Premier League Fixtures and Results. ')
  };
})



const port = process.env.PORT || 3000;

app.listen(port, function () {
  // console.log('Listening on port: ', port);
});

module.exports = app;