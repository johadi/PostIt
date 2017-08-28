module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200)
      .send('Welcome to PostIt API. An App for Sending notification to love ones. <a href="/api/doc">Click</a> to access our API'));
  app.use('/api', require('./auth'));
  app.use('/api', require('./group'));
  app.use('/api/*', (req, res) => res.status(404).json('Oops! 404, This route doesn\'t exist'));
};
