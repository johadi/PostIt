// User test
import dotenv from 'dotenv';
import request from 'supertest';
import { assert } from 'chai';
import app from '../../../app';
import userMockData from '../seed/userMockData';
import emptyDatabases from '../seed/emptyDatabases';
import seedDatabase from '../seed/seedDatabase';

dotenv.config();
describe('User API test', () => {
  // Test suite for controllers that get groups a user belongs to
  describe('Get User\'s Groups', () => {
    emptyDatabases();
    seedDatabase();
    let token = ''; // Hold token for authentication
    before((done) => {
      request(app)
        .post('/api/v1/user/signin')
        .send(userMockData.loginDetails)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          token = res.body;
          done();
        });
    });

    it('Should return 400 when user provides query string that is not a number',
      (done) => {
        request(app)
          .get('/api/v1/group/user/groups?page=x')
          .set({ 'x-auth': token })
          .expect(400)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body,
              'Oops! Something went wrong, page query value must be a number');
            done();
          });
      });

    it('Should return status 200 and the paginated result for valid query string',
      (done) => {
        request(app)
          .get('/api/v1/group/user/groups?page=1')
          .set({ 'x-auth': token })
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            // array of Groups user belongs with other information
            assert.exists(res.body.groups);
            // username of the person requesting his/her groups
            assert.exists(res.body.username);
            // pages the groups can make
            assert.exists(res.body.metaData.totalPages);
            // number of groups user belongs
            assert.exists(res.body.metaData.totalCount);
            done();
          });
      });
  });

  // Test suite for controllers that get all messages that are sent
  // to groups a user belongs to
  describe('Get User\'s messages in all joined group', () => {
    emptyDatabases();
    seedDatabase();
    let token = ''; // To hold our token for authentication
    before((done) => {
      request(app)
        .post('/api/v1/user/signin')
        .send(userMockData.loginDetails)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          token = res.body;
          done();
        });
    });

    it('Should return 400 for "page" query that is not a number', (done) => {
      request(app)
        .get('/api/v1/group/user/board?page=x')
        .set({ 'x-auth': token })
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body, 'This request is invalid.Request URL must have a query ' +
            'named page with number as value');
          done();
        });
    });

    it('Should return status 200 and the unread messages when "page" query is valid',
      (done) => {
        request(app)
          .get('/api/v1/group/user/board?page=1')
          .set({ 'x-auth': token })
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            // Array of Messages of all groups that user hasn't read
            assert.exists(res.body.messages);
            // Pages the unread messages can make
            assert.exists(res.body.metaData.totalPages);
            // Number of all messages in all groups that user hasn't read
            assert.exists(res.body.metaData.totalCount);
            done();
          });
      });
  });

  // Test suite for controllers that get all users in the application by search term.
  describe('Search Users', () => {
    emptyDatabases();
    seedDatabase();
    let token = ''; // Hold token for authentication
    before((done) => {
      request(app)
        .post('/api/v1/user/signin')
        .send(userMockData.loginDetails)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          token = res.body;
          done();
        });
    });

    it('Should return 400 when route has no "page" query for pagination', (done) => {
      request(app)
        .get('/api/v1/users')
        .set({ 'x-auth': token })
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body, 'This request is invalid. Request URL must ' +
            'have a query named search with value');
          done();
        });
    });

    it('Should return status code 200 and the users based on search term',
      (done) => {
        request(app)
          .get('/api/v1/users?search=johad')
          .set({ 'x-auth': token })
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            const {
              id, username, email, fullname
            } = userMockData.searchUser.validUserDetails;
            const user = {
              id, username, fullname, email
            };
            // check if the Array of users returned
            // include this user which is a registered user in the application
            assert.include(JSON.stringify(res.body), JSON.stringify(user));
            done();
          });
      });

    it('Should return status code 400 when groupId not a number', (done) => {
      request(app)
        .get('/api/v1/users?search=oman@gma&groupId=x')
        .set({ 'x-auth': token })
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body, 'Query groupId must be a number');
          done();
        });
    });

    it('Should return status code 400 when groupId is not valid', (done) => {
      request(app)
        .get('/api/v1/users?search=oman@gma&groupId=66')
        .set({ 'x-auth': token })
        .expect(404)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body, 'Invalid group');
          done();
        });
    });

    it('Should return status code 403 when user doesn\'t belong to the group',
      (done) => {
        request(app)
          .get('/api/v1/users?search=oman@gma&groupId=100')
          .set({ 'x-auth': token })
          .expect(403)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body, 'Invalid Operation: You don\'t belong to this group');
            done();
          });
      });

    it('Should return status code 200, the searched users and userIds in the group',
      (done) => {
        request(app)// CASE: search by email
          .get('/api/v1/users?search=oman@gma&groupId=99')
          .set({ 'x-auth': token })
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            // check if the Array of users returned include
            // this user which is a registered user in the application
            assert.include(JSON.stringify(res.body.allUsers),
              JSON.stringify(userMockData.searchUser.secondUserDetails));
            // already a member of groupId 99 . id should be in the groupUsersIds array
            assert.include(res.body.groupUsersId, 20);
            done();
          });
      });

    it('Should return status code 200, the searched users and userIds in the group',
      (done) => {
        request(app)// CASE: search by usernme
          .get('/api/v1/users?search=sherif&groupId=99')
          .set({ 'x-auth': token })
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            // check if the Array of users returned include
            // this user which is a registered user in the application
            assert.include(JSON.stringify(res.body.allUsers),
              JSON.stringify(userMockData.searchUser.thirdUserDetails));
            // since he is not a member of groupId 99 .
            // id should not be in the groupUsersIds array
            assert.notInclude(res.body.groupUsersId, 30);
            done();
          });
      });
  });
});
