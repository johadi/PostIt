require('dotenv').config();
// auth.test.js
const request = require('supertest');
const assert = require('chai').assert;
const app = require('./../../app');
const seeder = require('./seed/auth_seed');
const User = require('./../database/models').User;

describe('POST api/user/signup', () => {
  beforeEach(seeder.emptyDB);
  beforeEach(seeder.addUserToDb);

  it('Should return status code 400 and a message when input are invalid. i.e some empty fields', (done) => {
    request(app)
        .post('/api/user/signup')
        .send(seeder.setData('jimoh hadi', '', 'jimoh@gmail.com', '0908736521', '11223344', '11223344'))
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body, 'There are problems with your input');
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
          assert.equal(res.body, 'password not matched');
          done();
        });
  });
  it('should return status code 400 if Username already exists', (done) => {
    request(app)
        .post('/api/user/signup')
        .send(seeder.setData('jimoh hadi', 'ovenje', 'jimoh@gmail.com', '090112233', '11223344', '11223344'))
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body, 'This Username has been used');
          done();
        });
  });
  it('should return status code 400 and a message if there is an existing email', (done) => {
    request(app)
        .post('/api/user/signup')
        .send(seeder.setData('jimoh ali', 'ali', 'ovenje@yahoo.com', '090112233', '11223344', '11223344'))
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body, 'A user with this email already exists');
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
          assert.equal(res.body, 'This Mobile Number has been used');
          done();
        });
  });
  it('Should create a new user account when input is valid and return status code 201 with some user detail, no password', (done) => {
    request(app)
        .post('/api/user/signup')
        .send(seeder.setData('jimoh', 'johadi11', 'jimoh@gmail.com', '0908736521', '11223344', '11223344'))
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.email, 'jimoh@gmail.com');
          assert.equal(res.body.username, 'johadi11');
          const password = { password: '11223344' };
          assert.notInclude(res.body, password);
          done();
        });
  });
  it('it Should return true if raw password not equal to hashed password in database', (done) => {
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
              })
              .catch(err => done(err));
        });
  });
});
describe('POST api/user/signin', () => {
  // Empty our database
  before(seeder.emptyDB);
  // Seed database for this testing
  /* User: {
  fullname: 'jimoh hadi',
      username: 'ovenje',
      email: 'ovenje@yahoo.com',
      mobile: '8163041269',
      password: '11223344' }
  */
  before(seeder.addUserToDb);
  it('Should return status code 400 and a message when input are invalid. i.e some empty fields', (done) => {
    request(app)
        .post('/api/user/signin')
        .send(seeder.setLoginData('', '11223344'))
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body, 'There are problems with your input');
          done();
        });
  });
  it('Should return status code 404 and a message if User not found', (done) => {
    request(app)
        .post('/api/user/signin')
        .send(seeder.setLoginData('jimoh', '11223344'))
        .expect(404)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body, 'User not found');
          done();
        });
  });
  it('Should return status code 400 and a message when password is incorrect.', (done) => {
    request(app)
        .post('/api/user/signin')
        .send(seeder.setLoginData('ovenje', '11223366'))
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body, 'Incorrect password');
          done();
        });
  });
  it('Should return 200 and give the user token if credentials are correct.', (done) => {
    request(app)
        .post('/api/user/signin')
        .send(seeder.setLoginData('ovenje', '11223344'))
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message, 'Sign in successful');
          assert.exists(res.body.token);
          done();
        });
  });
});

