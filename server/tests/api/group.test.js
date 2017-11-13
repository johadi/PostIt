// group.test.js
import dotenv from 'dotenv';
import request from 'supertest';
import { assert } from 'chai';
import app from '../../../app';
import groupMockData from '../seed/groupMockData';
import models from '../../database/models';
import emptyDatabases from '../seed/emptyDatabases';
import seedDatabase from '../seed/seedDatabase';

dotenv.config();

describe('Group API test', () => {
  // const { username, fullname, id, email, mobile } = groupMockData.validUserDetails;
  // Test suit for creating group route and controller
  describe('Create Group', () => {
    const { name } = groupMockData.createGroup.firstGroupDetails;
    // Clear Test database
    emptyDatabases();
    seedDatabase();

    let token = ''; // Hold token for authentication
    before((done) => {
      request(app)
        .post('/api/v1/user/signin')
        .send(groupMockData.loginDetails)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          token = res.body;
          done();
        });
    });

    // Test for creating group
    it('Should return status 400 and error message when group name is empty',
      (done) => {
        const { emptyGroupName } = groupMockData.createGroup;
        request(app)
          .post('/api/v1/group')
          .send({ name: emptyGroupName, token })
          .expect(400)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body, 'Group name required');
            done();
          });
      });

    it('should return status code 422 and a message when group already exists',
      (done) => {
        const existingGroup = name;
        request(app)
          .post('/api/v1/group')
          .send({ name: existingGroup, token })
          .expect(422)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body, 'This Group already exists');
            done();
          });
      });

    it('Should return status code 201 and create group if all is well',
      (done) => {
        const newGroup = 'Class29';
        request(app)
          .post('/api/v1/group')
          .send({ name: newGroup, token })
          .expect(201)
          .end((err) => {
            if (err) return done(err);
            models.Group.findOne({
              where: { name: newGroup.toLowerCase() } // NOTE: Class must be lowercase
            })
              .then((group) => {
                assert.equal(group.name, newGroup.toLowerCase());
                done();
              });
          });
      });
  });

  // Test suit for adding user to group
  describe('Add Users to Group', () => {
    emptyDatabases();
    seedDatabase();

    const { username } = groupMockData.addUserToGroup.validUserDetails;
    let token = ''; // To hold our token for authentication

    before((done) => {
      request(app)
        .post('/api/v1/user/signin')
        .send(groupMockData.loginDetails)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          token = res.body;
          done();
        });
    });

    it('Should return status 400 when groupId is not a number.', (done) => {
      const { invalidGroupId } = groupMockData.addUserToGroup;
      request(app)
        .post(`/api/v1/group/${invalidGroupId}/user`)
        .send({ user: username, token })
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body,
            'Invalid request. Parameter groupId must be a number');
          done();
        });
    });

    it('Should return status 400 and a message if user input is empty',
      (done) => {
        const { emptyUser } = groupMockData.addUserToGroup;
        request(app)
          .post('/api/v1/group/99/user')
          .send({ user: emptyUser, token })
          .expect(400)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body, 'Provide Valid user detail to add to group');
            done();
          });
      });

    it('Should return status 422 when user wants to add himself to group he belongs.',
      (done) => {
        request(app)
          .post('/api/v1/group/99/user')
          .send({ user: username, token })
          .expect(422)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body,
              'You can\'t add yourself to group you already belong');
            done();
          });
      });

    it('Should return status code 403 when user adding not in that group',
      (done) => {
        request(app)
          .post('/api/v1/group/100/user')
          .send({ user: username, token })
          .expect(403)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body,
              'Invalid operation: you do not belong to this group');
            done();
          });
      });

    it('Should return status code 422 when user to be added already in a group',
      (done) => {
        const { existingUser } = groupMockData.addUserToGroup;
        request(app)
          .post('/api/v1/group/99/user')
          .send({ user: existingUser, token })
          .expect(422)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body, 'User already belongs to this group');
            done();
          });
      });

    it('Should return status code 404 when User tries to add ' +
      'user that doesn\'t exist.', (done) => {
      const { invalidUser } = groupMockData.addUserToGroup;
      request(app)
        .post('/api/v1/group/99/user')
        .send({ user: invalidUser, token })
        .expect(404)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body, 'User not found');
          done();
        });
    });

    it('Should return 404 and a message if groupId is invalid.', (done) => {
      const { notFoundGroupId } = groupMockData.addUserToGroup;
      const validUser = 'oman';
      request(app)
        .post(`/api/v1/group/${notFoundGroupId}/user`)
        .send({ user: validUser, token })
        .expect(404)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body, 'Invalid group');
          done();
        });
    });

    it('Should return 201 and information of who added user and who was added.',
      (done) => {
        const { secondExistingUser } = groupMockData.addUserToGroup;
        request(app)
          .post('/api/v1/group/99/user')
          .send({ user: secondExistingUser, token })
          .expect(201)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.message, 'User added successfully');
            // user that was added
            assert.equal(res.body.addedUser, secondExistingUser);
            // user that added is user which is johadi10
            assert.equal(res.body.addedBy, username);
            done();
          });
      });
  });

  // Test suite for controllers that get all users of a group
  describe('Get Users in a Group', () => {
    emptyDatabases();
    seedDatabase();

    let token = ''; // Hold token for authentication
    before((done) => {
      request(app)
        .post('/api/v1/user/signin')
        .send(groupMockData.loginDetails)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          token = res.body;
          done();
        });
    });

    it('Should return 400 when a user access route with invalid groupId.',
      (done) => {
        request(app)
          .get('/api/v1/group/x/group-users')
          .set({ 'x-auth': token })
          .expect(400)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body,
              'Invalid request. Parameter groupId must be a number');
            done();
          });
      });

    it('Should return 400 when route has "page" query that isn\'t number.', (done) => {
      request(app)
        .get('/api/v1/group/99/group-users?page=x')
        .set({ 'x-auth': token })
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body, 'Oops! Error. Request url must have query ' +
            'string named page with number as value');
          done();
        });
    });

    it('Should return 404 when a user access invalid group.', (done) => {
      request(app)
        .get('/api/v1/group/40/group-users?page=1')
        .set({ 'x-auth': token })
        .expect(404)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body, 'invalid group');
          done();
        });
    });

    it('Should return status 403 when user requests users in group he doesn\'t belong',
      (done) => {
        request(app)
          .get('/api/v1/group/100/group-users?page=1')
          .set({ 'x-auth': token })
          .expect(403)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body, 'Invalid Operation: You don\'t belong to this group');
            done();
          });
      });

    it('Should return status 200 and users in the group', (done) => {
      request(app)
        .get('/api/v1/group/99/group-users?page=1')
        .set({ 'x-auth': token })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          // array of Users in the group
          assert.exists(res.body.users);
          // name of the group
          assert.exists(res.body.name);
          // pages the users can make per page
          assert.exists(res.body.metaData.totalPages);
          // number of users in the group
          assert.exists(res.body.metaData.totalCount);
          done();
        });
    });
  });

  // Verify if a User has token or not
  describe('Verify User\'s token', () => {
    emptyDatabases();
    seedDatabase();

    let sherifToken = '';
    before((done) => {
      request(app)
        .post('/api/v1/user/signin')
        .send(groupMockData.newUserDetails)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          sherifToken = res.body;
          done();
        });
    });
    let token = ''; // Hold token for authentication
    before((done) => {
      request(app)
        .post('/api/v1/user/signin')
        .send(groupMockData.loginDetails)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          token = res.body;
          done();
        });
    });

    it('Should return 401 if user access a route without a token.', (done) => {
      request(app)
        .get('/api/v1/verify-token')
        .expect(401)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body, 'Unauthorized: No token provided');
          done();
        });
    });

    it('Should return 400 if user access a route with an invalid token.',
      (done) => {
        const { testToken } = groupMockData.verifyToken;
        request(app)
          .get('/api/v1/verify-token')
          .set({ 'x-auth': testToken })
          .expect(400)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body, 'This token is invalid');
            done();
          });
      });

    // In case if the user was issued a token but has been deleted from database
    it('Should return 404 for valid token but details not in database', (done) => {
      // Let us remove a user from database and use his token for testing here
      const { username } = groupMockData.verifyToken.newUserDetails;
      models.User.destroy({
        where: { username } })
        .then((rowDeleted) => {
          if (rowDeleted === 1) {
            request(app)
              .get('/api/v1/verify-token')
              .set({ 'x-auth': sherifToken })
              .expect(404)
              .end((err, res) => {
                if (err) return done(err);
                assert.equal(res.body, 'User with this token not found');
                done();
              });
          }
        });
    });

    it('Should return 200 if user provides token that matches database record.',
      (done) => {
        const {
        id, fullname, username, email, mobile
      } = groupMockData.verifyToken.validUserDetails;
        request(app)
          .get('/api/v1/verify-token')
          .set({ 'x-auth': token })
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body.id, id);
            assert.equal(res.body.fullname, fullname);
            assert.equal(res.body.username, username);
            assert.equal(res.body.email, email);
            assert.equal(res.body.mobile, mobile);
            assert.notExists(res.body.password);
            done();
          });
      });
  });
});
