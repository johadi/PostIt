// import express from 'express';
// import path from 'path';
// import open from 'open';
// import compression from 'compression';
// import favicon from 'serve-favicon';
// import bodyParser from 'body-parser';
// import logger from 'morgan';
// import routes from '../server/routes/index';
const express = require('express');
const path = require('path');
const open = require('open');
const compression = require('compression');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const logger = require('morgan');
const routes = require('../server/routes/index');

const port = process.env.PORT || 3000;
const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compression());
app.use(express.static('public/apidoc'));
app.use(express.static('production'));
app.use(favicon(path.join(__dirname, 'favicon.ico')));
routes(app);
app.get('/apidoc', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/apidoc/index.html'));
});
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../production/index.html'));
});

app.listen(port, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('app running on ', port);
  // open(`http://localhost:${port}`);
});
