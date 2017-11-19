import swaggerJSDoc from 'swagger-jsdoc';
import dotenv from 'dotenv';
import authRoutes from './auth';
import groupRoutes from './group';
import userRoutes from './user';
import messageRoutes from './message';

dotenv.load();
// swagger definition
const swaggerDefinition = {
  info: {
    title: 'Jimoh PostIt API',
    version: '1.0.0',
    description: 'Jimoh Hadi PostIt API documentation',
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

const apiRoutes = (app) => {
// serve swagger
  app.get('/apidoc.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
  // API routes
  app.get('/api', (req, res) => res.status(200)
      .send('Welcome to PostIt API. An App for Sending notification to loved ones.' +
        'To use this API, <a href="/api-docs">Click</a> here to view the ' +
        'API documentation'));
  app.use('/api', authRoutes);
  app.use('/api', groupRoutes);
  app.use('/api', userRoutes);
  app.use('/api', messageRoutes);
  app.use('/api/*', (req, res) =>
    res.status(404).json('Oops! 404, This route doesn\'t exist'));
};
export default apiRoutes;
