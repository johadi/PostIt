require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const http = require('http');
const path = require('path');
const apiRoutes = require('./server/routes/index');

const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 4000);
app.use(express.static(path.join(__dirname, './public')));

// Api routes
apiRoutes(app);

const server = http.createServer(app);

server.listen(app.get('port'), (err) => {
  if (err) {
    throw err;
  }
  console.log('App running on port', app.get('port'));
});

module.exports = app;
