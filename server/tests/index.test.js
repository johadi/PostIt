require('dotenv').config();
// index.test.js
const request = require('supertest');
const app = require('./../../app');

describe('GET: /api/xyz', () => {
  it('Should return status code 404 when user accesses non-existent route', (done) => {
    request(app)
        .get('/api/xytszdhhj')
        .expect(404)
        .end(done);
  });
  it('Should return status code 200 when user accesses index route', (done) => {
    request(app)
        .get('/')
        .expect(200)
        .end(done);
  });
  it('Should return status code 200 when API index route is accessed', (done) => {
    request(app)
        .get('/api')
        .expect(200)
        .end(done);
  });
});