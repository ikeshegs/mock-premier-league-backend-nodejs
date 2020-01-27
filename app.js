const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

const userRoute = require('./routes/user-route');

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(userRoute);

app.get('/', function(req, res) {
  res.json('Welcome to The Premier League Fixtures and Results App.');
});

const port = 3000;

app.listen(port, function() {
  console.log('Listening on port: ' + port);
});

module.exports = app;
