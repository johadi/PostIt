// index.test.js
import request from 'supertest';
import dotenv from 'dotenv';
import app from './../../app';

dotenv.config();
// Test for API home route and invalid routes
describe('GET: /api/xyz', () => {
  it('Should return status code 404 when user accesses non-existent route',
    (done) => {
      request(app)
        .get('/api/xytszdhhj')
        .expect(404)
        .end(done);
    });
  it('Should return status code 200 when API index route is accessed',
    (done) => {
      request(app)
        .get('/api')
        .expect(200)
        .end(done);
    });
});
