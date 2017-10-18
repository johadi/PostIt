const swaggerJSDoc = require('swagger-jsdoc');
const authRoutes = require('./auth');
const groupRoutes = require('./group');
const userRoutes = require('./user');
const messageRoutes = require('./message');

// host definition
const host = process.env.NODE_ENV === 'production' ?
  'https://jimoh-postit.herokuapp.com' : 'localhost:4000';
// swagger definition
const swaggerDefinition = {
  info: {
    title: 'Jimoh PostIt API',
    version: '1.0.0',
    description: 'Jimoh Hadi Andela Checkpoint API documentation',
  },
  host,
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
  app.get('/swagger.json', (req, res) => {
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
