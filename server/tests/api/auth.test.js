// auth.test.js
import request from 'supertest';
import { assert } from 'chai';
import jwtDecode from 'jwt-decode';
import dotenv from 'dotenv';
import app from '../../../app';
import authMockData from '../seed/authMockData';
import models from '../../database/models';
import { emptyAuthDatabase } from '../seed/emptyDatabases';
import { seedAuthDatabase } from '../seed/seedDatabase';

dotenv.config();

describe('Authentication API test', () => {
  // Test for Signup route
  describe('User Signup', () => {
    const {
      username, fullname, email, mobile, password, confirmPassword
    } = authMockData.signup.userDetails;

    emptyAuthDatabase();
    seedAuthDatabase();

    it('Should throw validation error message with status 400 for invalid inputs',
      (done) => {
        const { invalidUsername } = authMockData.signup;
        request(app)
          .post('/api/v1/user/signup')
          .send(authMockData.setUserDetails(fullname, invalidUsername,
            email, mobile, password, confirmPassword))
          .expect(400)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.validateError.username[0],
              'The username field is required.');
            done();
          });
      });

    it('should throw error message with status 422 when passwords not matched',
      (done) => {
        const { newPassword, newConfirmPassword } = authMockData.signup;
        request(app)
          .post('/api/v1/user/signup')
          .send(authMockData.setUserDetails(fullname, username, email,
            mobile, newPassword, newConfirmPassword))
          .expect(422)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body, 'passwords not matched');
            done();
          });
      });

    it('Should throw error message with status 422 for existing username',
      (done) => {
        const { existingUsername } = authMockData.signup;
        request(app)
          .post('/api/v1/user/signup')
          .send(authMockData.setUserDetails(fullname, existingUsername, email,
            mobile, password, confirmPassword))
          .expect(422)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body, 'This Username has been used');
            done();
          });
      });

    it('Should throw error message with status 422 for existing email',
      (done) => {
        const { existingEmail } = authMockData.signup;
        request(app)
          .post('/api/v1/user/signup')
          .send(authMockData.setUserDetails(fullname, username, existingEmail,
            mobile, password, confirmPassword))
          .expect(422)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body, 'A user with this email already exists');
            done();
          });
      });

    it('Should return token with status 201 when inputs are valid', (done) => {
      const newUsername = 'johadi11';
      request(app)
        .post('/api/v1/user/signup')
        .send(authMockData.setUserDetails(fullname, newUsername, email,
          mobile, password, confirmPassword))
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          const decodedToken = jwtDecode(res.body);
          assert.exists(decodedToken.id);
          assert.notExists(decodedToken.email);
          assert.notExists(decodedToken.username);
          const returnedPassword = { password: '11223344' };
          assert.notInclude(decodedToken, returnedPassword);
          done();
        });
    });

    it('it Should return true if password is hashed in database', (done) => {
      const {
        newFullname, newUsername, newMobile, newEmail, newPassword, newConfirmPassword
      } = authMockData.signup.newUserDetails;
      request(app)
        .post('/api/v1/user/signup')
        .send(authMockData.setUserDetails(newFullname,
          newUsername, newEmail, newMobile, newPassword, newConfirmPassword))
        .expect(201)
        .end((err) => {
          if (err) return done(err);
          models.User.findOne({
            where: { username: newUsername }
          })
            .then((user) => {
              assert.notEqual(user.password, newPassword);
              done();
            });
        });
    });
  });

  describe('User Signin', () => {
    const { username, password } = authMockData.signin.loginDetails;

    emptyAuthDatabase();
    seedAuthDatabase();

    it('Should throw validation error with status 400 when input is invalid',
      (done) => {
        const invalidUsername = '';
        request(app)
          .post('/api/v1/user/signin')
          .send(authMockData.setLoginDetails(invalidUsername, password))
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
        const notFoundUsername = 'jimoh';
        request(app)
          .post('/api/v1/user/signin')
          .send(authMockData.setLoginDetails(notFoundUsername, password))
          .expect(404)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body, 'User not found');
            done();
          });
      });

    it('Should return status code 422 and a message when password is incorrect.',
      (done) => {
        const incorrectPassword = '11223366';
        request(app)
          .post('/api/v1/user/signin')
          .send(authMockData.setLoginDetails(username, incorrectPassword))
          .expect(422)
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
          .send(authMockData.setLoginDetails(username, password))
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            assert.exists(res.body);
            const decodedToken = jwtDecode(res.body);
            assert.exists(decodedToken.id);
            assert.notExists(decodedToken.email);
            assert.notExists(decodedToken.username);
            done();
          });
      });
  });

  describe('User Recover Password', () => {
    emptyAuthDatabase();
    seedAuthDatabase();

    it('Should return status 400 and error message when input is invalid',
      (done) => {
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

    it('Should return status 404 with error message if email not found',
      (done) => {
        const invalidEmail = 'xyz@gmail.com';
        request(app)
          .post('/api/v1/user/recover-password')
          .send({ email: invalidEmail })
          .expect(404)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body,
              'Sorry! this email doesn\'t match our records');
            done();
          });
      });
  });

  describe('User reset password', () => {
    emptyAuthDatabase();
    seedAuthDatabase();

    it('Should return status code 400 and a message when link has no token',
      (done) => {
        request(app)
          .post('/api/v1/user/reset-password')
          .send({})
          .expect(400)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body, 'This link is Invalid');
            done();
          });
      });

    it('Should return status 400 with error message when input is invalid',
      (done) => {
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
  });
});
