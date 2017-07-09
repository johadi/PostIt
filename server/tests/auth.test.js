const request = require('supertest');
const assert = require('chai').assert;
const app = require('./../../app');
const seeder = require('./seed/auth_seed');
const User = require('./../database/models').User;

describe('POST api/user/signup', () => {
  beforeEach(seeder.emptyDB);
  beforeEach(seeder.addUserToDb);

  it('should return status code 400 and a message when input are invalid. i.e some empty fields', (done) => {
    request(app)
        .post('/api/user/signup')
        .send(seeder.setData('jimoh hadi', '', 'jimoh@gmail.com', '0908736521', '11223344', '11223344'))
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message, 'There are problems with your input');
          done();
        });
  });
  it('should return status code 400 and a message when password not matched', (done) => {
    request(app)
        .post('/api/user/signup')
        .send(seeder.setData('jimoh hadi', 'johadi', 'jimoh@gmail.com', '0908736521', '123456', '11223344'))
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message, 'password not matched');
          done();
        });
  });
  it('should return status code 400 if username already exists', (done) => {
    request(app)
        .post('/api/user/signup')
        .send(seeder.setData('jimoh hadi', 'ovenje', 'jimoh@gmail.com', '090112233', '11223344', '11223344'))
        .expect(400)
        .end(done);
  });
  it('should return status code 400 and a message if there is an existing email', (done) => {
    request(app)
        .post('/api/user/signup')
        .send(seeder.setData('jimoh ali', 'ali', 'ovenje@yahoo.com', '090112233', '11223344', '11223344'))
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
  });
  it('should return status code 400 and a message if there is an existing mobile number', (done) => {
    request(app)
        .post('/api/user/signup')
        .send(seeder.setData('jimoh ali', 'ali', 'ali@yahoo.com.com', '8163041269', '11223344', '11223344'))
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          done();
        });
  });
  it('with valid input, should create a new user account and return status code 201 with some user detail, no password', (done) => {
    request(app)
        .post('/api/user/signup')
        .send(seeder.setData('jimoh', 'johadi11', 'jimoh@gmail.com', '0908736521', '11223344', '11223344'))
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.email, 'jimoh@gmail.com');
          assert.exists(res.body.username);
          done();
        });
  });
  it('since the password will be hashed, it should return true if raw password not equal to hashed password in database', (done) => {
    request(app)
        .post('/api/user/signup')
        .send(seeder.setData('jimoh', 'johadi10', 'jimoh@gmail.com', '0908736521', '11223344', '11223344'))
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          User.findOne({
            where: { username: 'johadi10' }
          })
              .then((user) => {
                assert.notEqual(user.password, '11223344');
                done();
              });
        });
  });
});
