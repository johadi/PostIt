module.exports = (app) => {
  app.get('/', (req, res) => res.status(200)
      .send('Welcome to PostIt. A Place to Send notification to your love ones...Cheers!'));
  app.get('/api', (req, res) => res.status(200)
      .send('Welcome to PostIt API. An App for Sending notification to your love ones'));
  app.use(require('./auth'));
  app.use('/api', require('./group'));
  app.use('*', (req, res) => res.status(404).send('Oops! 404, Page not found'));
};
