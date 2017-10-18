const express = require('express');
const path = require('path');
const compression = require('compression');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const logger = require('morgan');
const apiRoutes = require('../server/routes/index');

const port = process.env.PORT || 3000;
const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());
app.use('/apidoc', express.static('public/apidoc'));
app.use(express.static('production'));
app.use(favicon(path.join(__dirname, 'favicon.ico')));
apiRoutes(app);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../production/index.html'));
});

app.listen(port, (err) => {
  if (err) {
    // uncomment to see error message
    // return console.log(err);
  }
  // Uncomment to see app running message
  // console.log('app running on port', port);
});
