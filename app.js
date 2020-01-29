const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

// Routes
const userRoute = require('./routes/user.route');
const teamRoute = require('./routes/team.route');
const fixtureRoute = require('./routes/fixture.route')

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(userRoute);
app.use(teamRoute);
app.use(fixtureRoute);

app.get('/', function(req, res) {
  res.json('Welcome to The Premier League Fixtures and Results App.');
});

const port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log('Listening on port: ',port);
});

module.exports = app;
