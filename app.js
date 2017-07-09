require('dotenv').config();
const app = require('express')();
const bodyParser = require('body-parser');
const logger = require('morgan');
const http = require('http');


app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 4000);

// Api routes
require('./server/routes/index')(app);

const server = http.createServer(app);

server.listen(app.get('port'), (err) => {
  if (err) {
    throw err;
  }
  console.log('App running on port', app.get('port'));
});

module.exports = app;
