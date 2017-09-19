require('dotenv').config();
// auth.test.js
const request = require('supertest');
const assert = require('chai').assert;
const jwtDecode = require('jwt-decode');
const app = require('./../../app');
const seeder = require('./seed/auth_seed');
const User = require('./../database/models').User;
const PasswordRecovery = require('./../database/models').PasswordRecovery;
// Test for Signup route
describe('POST api/v1/user/signup', () => {
  beforeEach(seeder.emptyDB);
  beforeEach(seeder.addUserToDb);
  it('Should return status code 400 and a message when some ' +
    'inputs are invalid. i.e Username', (done) => {
    request(app)
      .post('/api/v1/user/signup')
      .send(seeder.setData('jimoh hadi', '',
        'jimoh@gmail.com', '0908736521', '11223344', '11223344'))
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.body.validateError.username[0],
          'The username field is required.');
        done();
      });
  });
  it('should return status code 400 and a message when passwords ' +
    'not matched', (done) => {
    request(app)
      .post('/api/v1/user/signup')
      .send(seeder.setData('jimoh hadi', 'johadi', 'jimoh@gmail.com',
        '0908736521', '123456', '11223344'))
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.body, 'passwords not matched');
        done();
      });
  });
  it('should return status code 400 if Username already exists', (done) => {
    request(app)
      .post('/api/v1/user/signup')
      .send(seeder.setData('jimoh hadi', 'ovenje', 'jimoh@gmail.com',
        '090112233', '11223344', '11223344'))
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.body, 'This Username has been used');
        done();
      });
  });
  it('should return status code 400 and a message if there is ' +
    'an existing email', (done) => {
    request(app)
      .post('/api/v1/user/signup')
      .send(seeder.setData('jimoh ali', 'ali', 'ovenje@yahoo.com',
        '090112233', '11223344', '11223344'))
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.body, 'A user with this email already exists');
        done();
      });
  });
  it('Should create a new user account when input is valid and return ' +
    'status code 201 with a token', (done) => {
    request(app)
      .post('/api/v1/user/signup')
      .send(seeder.setData('jimoh', 'johadi11', 'jimoh@gmail.com',
        '0908736521', '11223344', '11223344'))
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        const decodedToken = jwtDecode(res.body);
        assert.equal(decodedToken.email, 'jimoh@gmail.com');
        assert.equal(decodedToken.username, 'johadi11');
        const password = { password: '11223344' };
        assert.notInclude(decodedToken, password);
        done();
      });
  });
  it('it Should return true if raw password not equal to hashed password ' +
    'in database', (done) => {
    request(app)
      .post('/api/v1/user/signup')
      .send(seeder.setData('jimoh', 'johadi10', 'jimoh@gmail.com',
        '0908736521', '11223344', '11223344'))
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
// Test for Signin route
describe('POST api/v1/user/signin', () => {
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
  it('Should return status code 400 and a message when any input is ' +
    'invalid. i.e username field', (done) => {
    request(app)
      .post('/api/v1/user/signin')
      .send(seeder.setLoginData('', '11223344'))
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.body.validateError.username[0],
          'The username field is required.');
        done();
      });
  });
  it('Should return status code 404 and a message if User not found',
    (done) => {
      request(app)
        .post('/api/v1/user/signin')
        .send(seeder.setLoginData('jimoh', '11223344'))
        .expect(404)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body, 'User not found');
          done();
        });
    });
  it('Should return status code 400 and a message when password is incorrect.',
    (done) => {
      request(app)
        .post('/api/v1/user/signin')
        .send(seeder.setLoginData('ovenje', '11223366'))
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body, 'Incorrect password');
          done();
        });
    });
  it('Should return 200 and give the user token if credentials are correct.',
    (done) => {
      request(app)
        .post('/api/v1/user/signin')
        .send(seeder.setLoginData('ovenje', '11223344'))
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          assert.exists(res.body);
          const decodedToken = jwtDecode(res.body);
          assert.equal(decodedToken.username, 'ovenje');
          done();
        });
    });
});
// Password recovery test
describe('POST api/v1/user/recover-password', () => {
  // Empty our database
  before(seeder.emptyDB);
  before(seeder.emptyPasswordRecoveryDB);
  // Seed database for this testing
  /* User: {
  fullname: 'jimoh hadi',
      username: 'ovenje',
      email: 'ovenje@yahoo.com',
      mobile: '8163041269',
      password: '11223344' }
  */
  before(seeder.addUserToDb);
  it('Should return status code 400 and a message when any input is ' +
    'invalid. i.e email field', (done) => {
    request(app)
      .post('/api/v1/user/recover-password')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.body.validateError.email[0],
          'The email field is required.');
        done();
      });
  });
  it('Should return status code 404 and a message if user email not found',
    (done) => {
      request(app)
        .post('/api/v1/user/recover-password')
        .send({ email: 'xyz@gmail.com' })
        .expect(404)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body, 'Sorry! this email doesn\'t match our records');
          done();
        });
    });
});
// Password reset
describe('POST api/v1/user/reset-password', () => {
  // Empty our database
  before(seeder.emptyDB);
  before(seeder.emptyPasswordRecoveryDB);
  const passwordTokenValid = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6N' +
    'CwidXNlcm5hbWUiOiJvdmVuamUiLCJlbWFpbCI6Im92ZW5qZUB5YWhvby5jb20iLCJm' +
    'dWxsbmFtZSI6ImppbW9oIGhhZGkiLCJpYXQiOjE1MDUzMjQ5NDZ9.yMptPZjWbs9s' +
    'rHENrzkiYAv9ejDLn5ppZ0eBGIZaTXE';
  // Seed database for this testing
  /* User: {
      id: 4,
      fullname: 'jimoh hadi',
      username: 'ovenje',
      email: 'ovenje@yahoo.com',
      mobile: '8163041269',
      password: '11223344' }
  */
  before(seeder.addUserToDb);
  it('Should return status code 400 and a message when link has no token',
    (done) => {
      request(app)
        .post('/api/v1/user/reset-password')
        .send({ })
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body, 'This link is Invalid');
          done();
        });
    });
  it('Should return status code 400 and a message when any input is ' +
    'invalid. i.e email field', (done) => {
    request(app)
      .post('/api/v1/user/reset-password?token=xyzabcqwerty')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.body, 'This link seems to have expired or invalid');
        done();
      });
  });
  it('Should return status code 404 and a message if user email not found',
    (done) => {
      const passwordToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjY2LCJ1c' +
           '2VybmFtZSI6ImpvaGFkaTEwIiwiZW1haWwiOiJqaW0uaGFkaTEwQGdtYWlsLmNvbSIs' +
           'Im1vYmlsZSI6IisyMzQ4MTYzMDQxMjY5IiwiZnVsbG5hbWUiOiJqaW1vaCBoYWRpIiwia' +
           'WF0IjoxNTA1MzE4MjkzfQ.q8hobiKb0CGAB097s_1ujMOvowgJaurw2MUdNsaahD4';
      request(app)
        .post(`/api/v1/user/reset-password?token=${passwordToken}`)
        .send({})
        .expect(404)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body,
            'User with this recovery link doesn\'t match our record');
          done();
        });
    });
  it('Should return status code 404 and a message if no record of a user ' +
    'requesting to change password',
    (done) => {
      const passwordToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6N' +
        'CwidXNlcm5hbWUiOiJvdmVuamUiLCJlbWFpbCI6Im92ZW5qZUB5YWhvby5jb20iLCJm' +
        'dWxsbmFtZSI6ImppbW9oIGhhZGkiLCJpYXQiOjE1MDUzMjQ5NDZ9.yMptPZjWbs9s' +
        'rHENrzkiYAv9ejDLn5ppZ0eBGIZaTXE';
      request(app)
        .post(`/api/v1/user/reset-password?token=${passwordToken}`)
        .send({})
        .expect(404)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body,
            'No record for this User requesting password change');
          done();
        });
    });
  it('Should return status code 400 and a message if any of ' +
    'the password fields is not valid',
    (done) => {
      // Create a new log for the user, if not
      PasswordRecovery.create({ email: 'ovenje@yahoo.com', hashed: passwordTokenValid })
        .then(() => {
          request(app)
            .post(`/api/v1/user/reset-password?token=${passwordTokenValid}`)
            .send({})
            .expect(400)
            .end((err, res) => {
              if (err) return done(err);
              assert.equal(res.body.validateError.password[0],
                'The password field is required.');
              assert.equal(res.body.validateError.confirmPassword[0],
                'The confirmPassword field is required.');
              done();
            });
        });
    });
  it('Should return status code 404 and a message if user email not found',
    (done) => {
      // Create a new log for the user, if not
      PasswordRecovery.create({ email: 'ovenje@yahoo.com', hashed: passwordTokenValid })
        .then(() => {
          request(app)
            .post(`/api/v1/user/reset-password?token=${passwordTokenValid}`)
            .send({ password: '112233', confirmPassword: '11223344' })
            .expect(400)
            .end((err, res) => {
              if (err) return done(err);
              assert.equal(res.body, 'Passwords not matched');
              done();
            });
        });
    });
  it('Should return status code 200 and a message if password changed successfully',
    (done) => {
      PasswordRecovery.create({ email: 'ovenje@yahoo.com', hashed: passwordTokenValid })
        .then(() => {
          request(app)
            .post(`/api/v1/user/reset-password?token=${passwordTokenValid}`)
            .send({ password: '11223344', confirmPassword: '11223344' })
            .expect(200)
            .end((err, res) => {
              if (err) return done(err);
              assert.equal(res.body, 'Password changed successfully');
              done();
            });
        });
    });
});
