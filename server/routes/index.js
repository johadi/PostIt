const authRoutes = require('./auth');
const groupRoutes = require('./group');
const passwordRoutes = require('./password');

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200)
      .send('Welcome to PostIt API. An App for Sending ' +
        'notification to love ones.' +
        '<a href="/apidoc">Click</a> to access our API'));
  app.use('/api', authRoutes);
  app.use('/api', passwordRoutes);
  app.use('/api', groupRoutes);
  app.use('/api/*', (req, res) =>
    res.status(404).json('Oops! 404, This route doesn\'t exist'));
};
