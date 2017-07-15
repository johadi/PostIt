require('dotenv').config();
// auth.test.js
const request = require('supertest');
const assert = require('chai').assert;
const app = require('./../../app');
const seeder = require('./seed/group_seed');
const User = require('./../database/models').User;
const Group = require('./../database/models').Group;
const UserGroup = require('./../database/models').UserGroup;
const UserGroupAdd = require('./../database/models').UserGroupAdd;
const Message = require('./../database/models').Message;
const db = require('./../database/models');
// Test for creating group route and controller
describe('POST: api/group', () => {
  // Clear Test database
  before(seeder.emptyUserDB);
  before(seeder.emptyMessageDB);
  before(seeder.emptyGroupDB);
  before(seeder.emptyUserGroupDB);
  // Start adding users to DB
  before(seeder.addUserToDb);
  before(seeder.addUserToDb2);
  // Create a group
  before(seeder.createGroup);
  let token = ''; // To hold our token for authentication
  it('Should return 200 and give the user token if credentials are correct.', (done) => {
    request(app)
        .post('/api/user/signin')
        .send({ username: 'johadi10', password: '11223344' })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          token = res.body.data.token;
          done();
        });
  });
  // Test for creating group
  it('Should return status code 400 and a message when input are invalid. i.e some empty fields', (done) => {
    request(app)
        .post('/api/group')
        .send({ name: '', token })
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message, 'Group name required');
          done();
        });
  });
  it('should return status code 400 and a message when group already exists', (done) => {
    request(app)
        .post('/api/group')
        .send({ name: 'Andela', token })
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message, 'This Group already exists');
          done();
        });
  });
  it('Should return status code 201 and create Group if all is well', (done) => {
    request(app)
        .post('/api/group')
        .send({ name: 'Lagos', token })
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          Group.findOne({
            where: { name: 'lagos' } // NOTE: bootcamp must be lowercase
          })
              .then((group) => {
                assert.equal(group.name, 'lagos');
                done();
              })
              .catch(err => done(err));
        });
  });
});
//* Test for adding user to group
describe('POST api/group/:groupId/user', () => {
  // Clear Test database
  before(seeder.emptyUserDB);
  before(seeder.emptyMessageDB);
  before(seeder.emptyGroupDB);
  before(seeder.emptyUserGroupDB);
  // Start adding users to DB
  before(seeder.addUserToDb);
  before(seeder.addUserToDb2);
  // Create a group
  before(seeder.createGroup);
  before(seeder.createGroup2);
  before(seeder.addUserToGroup);
  let token = ''; // To hold our token for authentication
  it('Should return 200 and give the user token if credentials are correct.', (done) => {
    request(app)
        .post('/api/user/signin')
        .send({ username: 'johadi10', password: '11223344' })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          token = res.body.data.token;
          done();
        });
  });
  // before(seeder.addUserToDb);
  it('Should return status code 400 and a message when groupId is not a number.', (done) => {
    request(app)
        .post('/api/group/x/user')
        .send({ user: 'johadi10', token })
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message, 'Oops! Something went wrong, Check your route');
          done();
        });
  });
  it('Should return status code 400 and a message if group name field is empty', (done) => {
    request(app)
        .post('/api/group/1/user')
        .send({ user: '', token })
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message, 'Provide Valid user detail to add to group');
          done();
        });
  });
  it('Should return status code 400 and a ' +
      'message when User tries to add himself to group he belongs.', (done) => {
    request(app)
        .post('/api/group/1/user')
        .send({ user: 'johadi10', token })
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message, 'Already a member. You can\'t add yourself to the group again');
          done();
        });
  });
  it('Should return 404 and a message if groupId is invalid.', (done) => {
    request(app)
        .post('/api/group/6/user')
        .send({ user: 'oman', token })
        .expect(404)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message, 'Invalid group');
          done();
        });
  });
}); // end
describe('POST api/group/:groupId/message', () => {
  // Clear Test database
  before(seeder.emptyUserDB);
  before(seeder.emptyMessageDB);
  before(seeder.emptyGroupDB);
  before(seeder.emptyUserGroupDB);
  // Start adding users to DB
  before(seeder.addUserToDb);
  before(seeder.addUserToDb2);
  // Create a group
  before(seeder.createGroup);
  before(seeder.createGroup2);
  before(seeder.addUserToGroup);
  before(seeder.addMessageToDb);
  let token = ''; // To hold our token for authentication
  it('Should return 200 and give the user token if credentials are correct.', (done) => {
    request(app)
        .post('/api/user/signin')
        .send({ username: 'johadi10', password: '11223344' })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          token = res.body.data.token;
          done();
        });
  });
  it('Should return status code 400 and a message when groupId is not a number.', (done) => {
    request(app)
        .post('/api/group/x/message')
        .send({ user: 'johadi10', token })
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message, 'Oops! Something went wrong, Check your route');
          done();
        });
  });
  it('Should return 400 and a message if no message body', (done) => {
    request(app)
        .post('/api/group/1/message')
        .send({ message: '', token })
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message, 'Message body required');
          done();
        });
  });
});
describe('Get api/group/groupId/message', () => {
  // Clear Test database
  before(seeder.emptyUserDB);
  before(seeder.emptyMessageDB);
  before(seeder.emptyGroupDB);
  before(seeder.emptyUserGroupDB);
  // Start adding users to DB
  before(seeder.addUserToDb);
  before(seeder.addUserToDb2);
  // Create a group
  before(seeder.createGroup);
  before(seeder.createGroup2);
  before(seeder.addUserToGroup);
  before(seeder.addUserToGroup2);
  before(seeder.addMessageToDb);
  before(seeder.addMessageToDb2);
  before(seeder.addMessageToDb3);
  // this is strictly for a user to create group belongs to it but has no message in it
  before(seeder.createGroup4);
  before(seeder.addUserToGroup4);
  let token = ''; // To hold our token for authentication
  it('Should return 200 and give the user token if credentials are correct.', (done) => {
    request(app)
        .post('/api/user/signin')
        .send({ username: 'johadi10', password: '11223344' })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          token = res.body.data.token;
          done();
        });
  });
  it('Should return 400 when a user access invalid route.', (done) => {
    request(app)
        .get('/api/group/x/message')
        .set({ 'x-auth': token })
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message, 'Oops! Something went wrong, Check your route');
          done();
        });
  });
  it('Should return 400 when a user access invalid route.', (done) => {
    request(app)
        .get('/api/group/3/message')
        .set({ 'x-auth': token })
        .expect(404)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message, 'invalid group');
          done();
        });
  });
  it('Should return status code 400 when user tries to get messages from' +
      ' group he doesn\'t belong', (done) => {
    request(app)
        .get('/api/group/100/message')
        .set({ 'x-auth': token })
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message, 'Invalid Operation: You don\'t belong to this group');
          done();
        });
  });
  it('Should return status code 200 when user tries to get messages from' +
      ' group he belongs', (done) => {
    request(app)
        .get('/api/group/99/message')
        .set({ 'x-auth': token })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          assert.exists(res.body.data);
          done();
        });
  });
  it('Should return status code 404 when user tries to get messages from' +
      ' group he belongs but no message', (done) => {
    request(app)
        .get('/api/group/101/message')
        .set({ 'x-auth': token })
        .expect(404)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message, 'You have no message in this group');
          done();
        });
  });
});
