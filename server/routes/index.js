module.exports = (app) => {
  app.use(require('./auth'));
  app.use(require('./group'));
  app.use('*', (req, res) => {
    res.status(404).send('Oops! 404<h2>Page not found</h2>');
  });
};
