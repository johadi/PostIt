// User test
import dotenv from 'dotenv';
import request from 'supertest';
import { assert } from 'chai';
import app from '../../../app';
import seeder from '../seed/group_seed';

dotenv.config();
describe('User API test', () => {
  // Test suite for controllers that get groups a user belongs to
  describe('Get api/v1/group/user/groups', () => {
    // Clear Test database
    before(seeder.emptyUserDB);
    before(seeder.emptyMessageDB);
    before(seeder.emptyGroupDB);
    before(seeder.emptyUserGroupDB);
    // Add users to DB
    // {id: 5, username: johadi10, email: johadi10@yahoo.com} User
    before(seeder.addUserToDb);
    // {id: 20, username: oman, email: oman@gmail.com} User
    before(seeder.addUserToDb2);
    // {id: 30, username: sherif, email: sherif@gmail.com} User
    before(seeder.addUserToDb3);
    // Create a group
    before(seeder.createGroup); // {id: 99, name: andela, creatorId: 1} Group
    before(seeder.createGroup2); // {id: 100, name: react, creatorId: 7} Group
    // Add users to groups
    before(seeder.addUserToGroup); // {groupId: 100, userId: 10} UserGroup
    before(seeder.addUserToGroup2); // {groupId: 99, userId: 5} UserGroup
    before(seeder.addUserToGroup4); // {groupId: 99, userId: 20} UserGroup
    let token = ''; // To hold our token for authentication
    before((done) => {
      request(app)
        .post('/api/v1/user/signin')
        .send({ username: 'johadi10', password: '11223344' })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          token = res.body;
          done();
        });
    });
    it('Should return 400 when a user access route without query string named ' +
      'page that indicate pagination.', (done) => {
      request(app)
        .get('/api/v1/group/user/groups')
        .set({ 'x-auth': token })
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body, 'Oops! Error. Request url must have query string ' +
            'named page with number as value');
          done();
        });
    });
    it('Should return 400 when a user access route with query string named page but not ' +
      'a number value.', (done) => {
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
    it('Should return status code 200 and the paginated groups when user tries ' +
      'to get list of groups he/she belongs to on page 1.', (done) => {
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
          assert.exists(res.body.pages);
          // number of groups user belongs
          assert.exists(res.body.count);
          done();
        });
    });
  });
  // Test suite for controllers that get all messages
  // that are sent to groups a user belongs to
  describe('Get api/v1/group/user/board', () => {
    // Clear Test database
    before(seeder.emptyUserDB);
    before(seeder.emptyMessageDB);
    before(seeder.emptyGroupDB);
    before(seeder.emptyUserGroupDB);
    // Add users to DB
    // {id: 5, username: johadi10, email: johadi10@yahoo.com} User
    before(seeder.addUserToDb);
    // {id: 20, username: oman, email: oman@gmail.com} User
    before(seeder.addUserToDb2);
    // {id: 30, username: sherif, email: sherif@gmail.com} User
    before(seeder.addUserToDb3);
    // Create a group
    before(seeder.createGroup); // {id: 99, name: andela, creatorId: 1} Group
    before(seeder.createGroup2); // {id: 100, name: react, creatorId: 7} Group
    before(seeder.createGroup3); // {id: 101, name: react, creatorId: 7} Group
    // Add users to groups
    before(seeder.addUserToGroup); // {groupId: 100, userId: 10} UserGroup
    before(seeder.addUserToGroup2); // {groupId: 99, userId: 5} UserGroup
    before(seeder.addUserToGroup3); // {groupId: 101, userId: 5} UserGroup
    before(seeder.addUserToGroup4); // {groupId: 99, userId: 20} UserGroup
    let token = ''; // To hold our token for authentication
    before((done) => {
      request(app)
        .post('/api/v1/user/signin')
        .send({ username: 'johadi10', password: '11223344' })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          token = res.body;
          done();
        });
    });
    it('Should return 400 when a user access route without query string named ' +
      'page that indicate pagination.', (done) => {
      request(app)
        .get('/api/v1/group/user/board')
        .set({ 'x-auth': token })
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body, 'This request is invalid.Request URL must have a query ' +
            'named page with number as value');
          done();
        });
    });
    it('Should return 400 when a user access route with query string named page but not ' +
      'a number value.', (done) => {
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
    it('Should return status code 200 and the messages when user tries to get all ' +
      'messages of groups he/she belongs to that he hasn\'t read on page1.', (done) => {
      request(app)
        .get('/api/v1/group/user/board?page=1')
        .set({ 'x-auth': token })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          // Array of Messages of all groups that user hasn't read
          assert.exists(res.body.messages);
          assert.exists(res.body.pages); // Pages the unread messages can make
          // Number of all messages in all groups that user hasn't read
          assert.exists(res.body.count);
          done();
        });
    });
  });
  // Test suite for controllers that get all users in the application by search term.
  describe('Get api/v1/users', () => {
    // Clear Test database
    before(seeder.emptyUserDB);
    before(seeder.emptyMessageDB);
    before(seeder.emptyGroupDB);
    before(seeder.emptyUserGroupDB);
    // Add users to DB
    // {id: 5, username: johadi10, email: johadi10@yahoo.com} User
    before(seeder.addUserToDb);
    // {id: 20, username: oman, email: oman@gmail.com} User
    before(seeder.addUserToDb2);
    // {id: 30, username: sherif, email: sherif@gmail.com} User
    before(seeder.addUserToDb3);
    // Create a group
    before(seeder.createGroup); // {id: 99, name: andela, creatorId: 1} Group
    before(seeder.createGroup2); // {id: 100, name: react, creatorId: 7} Group
    before(seeder.createGroup3); // {id: 101, name: react, creatorId: 7} Group
    // Add users to groups
    before(seeder.addUserToGroup); // {groupId: 100, userId: 10} UserGroup
    before(seeder.addUserToGroup2); // {groupId: 99, userId: 5} UserGroup
    before(seeder.addUserToGroup3); // {groupId: 101, userId: 5} UserGroup
    before(seeder.addUserToGroup4); // {groupId: 99, userId: 20} UserGroup
    let token = ''; // To hold our token for authentication
    before((done) => {
      request(app)
        .post('/api/v1/user/signin')
        .send({ username: 'johadi10', password: '11223344' })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          token = res.body;
          done();
        });
    });
    it('Should return 400 when a user access this route without query string named ' +
      'page that indicate pagination.', (done) => {
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
    it('Should return status code 200 and the users in the application that ' +
      'match the search term with at most 10 results', (done) => {
      request(app)
        .get('/api/v1/users?search=johad')
        .set({ 'x-auth': token })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          const user = {
            id: 5,
            username: 'johadi10',
            fullname: 'jimoh hadi',
            email: 'johadi10@yahoo.com'
          };
          // check if the Array of users returned
          // include this user which is a registered user in the application
          assert.include(JSON.stringify(res.body), JSON.stringify(user));
          done();
        });
    });
    it('Should return status code 400 and error message when the value of groupId ' +
      'query is not a number', (done) => {
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
    it('Should return status code 400 and error message when the value of groupId ' +
      'query is not a valid one', (done) => {
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
    it('Should return status code 400 and error message when user tries to make ' +
      'use of valid groupId of a group he doesn\'t belong', (done) => {
      request(app)
        .get('/api/v1/users?search=oman@gma&groupId=100')
        .set({ 'x-auth': token })
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body, 'Invalid Operation: You don\'t belong to this group');
          done();
        });
    });
    it('Should return status code 200 and the users when user search for ' +
      'other users in the application and also ' +
      'request userIds of users in a certain group', (done) => {
      request(app)// CASE: user already a member of groupId 99
        .get('/api/v1/users?search=oman@gma&groupId=99')
        .set({ 'x-auth': token })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          const user = {
            id: 20,
            username: 'oman',
            fullname: 'jack oman',
            email: 'oman@gmail.com'
          };
          // check if the Array of users returned include
          // this user which is a registered user in the application
          assert.include(JSON.stringify(res.body.allUsers), JSON.stringify(user));
          // already a member of groupId 99 . id should be in the groupUsersIds array
          assert.include(res.body.groupUsersId, 20);
          done();
        });
    });
    it('Should return status code 200 and the users when user search for other users in ' +
      'the application and also request userIds of users in a certain group', (done) => {
      request(app)// CASE: user not a member of groupId 99
        .get('/api/v1/users?search=sherif&groupId=99')
        .set({ 'x-auth': token })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          const user = {
            id: 30,
            username: 'sherif',
            fullname: 'muhammed sherif',
            email: 'sherif@gmail.com'
          };
          // check if the Array of users returned include
          // this user which is a registered user in the application
          assert.include(JSON.stringify(res.body.allUsers), JSON.stringify(user));
          // since he is not a member of groupId 99 .
          // id should not be in the groupUsersIds array
          assert.notInclude(res.body.groupUsersId, 30);
          done();
        });
    });
  });
});
