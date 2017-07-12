module.exports = (app) => {
  app.get('/', (req, res) => res.status(200).send('Welcome to PostIt. Send notification to your love ones'));
  app.use(require('./auth'));
  app.use(require('./group'));
  app.use('*', (req, res) => {
    return res.status(404).send('Oops! 404<h2>Page not found</h2>');
  });
};
