require('dotenv').load();
const swaggerJSDoc = require('swagger-jsdoc');
const authRoutes = require('./auth');
const groupRoutes = require('./group');
const userRoutes = require('./user');
const messageRoutes = require('./message');

// swagger definition
const swaggerDefinition = {
  info: {
    title: 'Jimoh PostIt API',
    version: '1.0.0',
    description: 'Jimoh Hadi Andela Checkpoint API documentation',
  },
  host: process.env.API_HOST,
  basePath: '/',
};
// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition,
  // path to the API docs
  apis: ['./server/routes/*.js'],
};
// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

module.exports = (app) => {
// serve swagger
  app.get('/apidoc.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
  // API routes
  app.get('/api', (req, res) => res.status(200)
      .send('Welcome to PostIt API. An App for Sending ' +
        'notification to love ones.' +
        '<a href="/apidoc">Click</a> to access our API'));
  app.use('/api', authRoutes);
  app.use('/api', groupRoutes);
  app.use('/api', userRoutes);
  app.use('/api', messageRoutes);
  app.use('/api/*', (req, res) =>
    res.status(404).json('Oops! 404, This route doesn\'t exist'));
};
