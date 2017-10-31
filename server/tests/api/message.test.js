// message test
import dotenv from 'dotenv';
import request from 'supertest';
import { assert } from 'chai';
import app from '../../../app';
import seeder from '../seed/group_seed';

dotenv.config();
describe('Message API test', () => {
  // Test suite for posting a message
  describe('POST api/v1/group/:groupId/message', () => {
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
    // create a message
    // {groupId: 99, userId: 5, body: 'Carry Something .....'}
    before(seeder.addMessageToDb);
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
    it('Should return status code 400 and a message when groupId is not a number.', (done) => {
      request(app)
        .post('/api/v1/group/x/message')
        .send({ message: 'no condition is permanent', token })
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body, 'Invalid request. Parameter groupId must be a number');
          done();
        });
    });
    it('Should return 400 and a message if no message body', (done) => {
      request(app)
        .post('/api/v1/group/99/message')
        .send({ message: '', token })
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body, 'Message body required');
          done();
        });
    });
    it('Should return 400 and a message if priority level not either' +
      'normal, urgent or critical', (done) => {
      request(app)
        .post('/api/v1/group/99/message')
        .send({ message: 'I love NodeJS', priority: 'abnormal', token })
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body,
            'Message priority level can only be normal or urgent or critical');
          done();
        });
    });
    it('Should return 404 and a message if group is invalid', (done) => {
      request(app)
        .post('/api/v1/group/70/message')
        .send({ message: 'I love NodeJS', priority: 'critical', token })
        .expect(404)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body, 'Invalid group');
          done();
        });
    });
    it('Should return 400 and a message if user doesn\'t belong to a group', (done) => {
      request(app)
        .post('/api/v1/group/100/message')
        .send({ message: 'I love NodeJS', priority: 'critical', token })
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body, 'Invalid Operation: ' +
            'You can\'t post to group You don\'t belong');
          done();
        });
    });
    it('Should return 201 and a message if message was successfully posted', (done) => {
      request(app)
        .post('/api/v1/group/99/message')
        .send({ message: 'I love NodeJS', priority: 'normal', token })
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body, 'Message created successfully');
          done();
        });
    });
  });
  // Test suite for getting messages in a particular group
  describe('Get api/v1/group/groupId/message', () => {
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
    // create a message
    // {groupId: 99, userId: 5, body: 'Carry Something .....'}
    before(seeder.addMessageToDb);
    // {groupId: 100, userId: 20, body: 'Carry Something more than .....'}
    before(seeder.addMessageToDb2);
    // {groupId: 99, userId: 5, body: 'Learners are leaders .....'}
    before(seeder.addMessageToDb3);
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
    it('Should return 400 when a user access invalid route.', (done) => {
      request(app)
        .get('/api/v1/group/x/message')
        .set({ 'x-auth': token })
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body, 'Invalid request. Parameter groupId must be a number');
          done();
        });
    });
    it('Should return 400 when a user doesn\'t provide query parameter "page" ' +
      'that serves as pagination.', (done) => {
      request(app)
        .get('/api/v1/group/99/message')
        .set({ 'x-auth': token })
        .expect(400)
        .end(done);
    });
    it('Should return 400 when a user access invalid group.', (done) => {
      request(app)
        .get('/api/v1/group/33/message?page=1')
        .set({ 'x-auth': token })
        .expect(404)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body, 'invalid group');
          done();
        });
    });
    it('Should return status code 400 when user tries to get messages from' +
      ' group he doesn\'t belong', (done) => {
      request(app)
        .get('/api/v1/group/100/message?page=1')
        .set({ 'x-auth': token })
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body, 'Invalid Operation: You don\'t belong to this group');
          done();
        });
    });
    it('Should return status code 200 and the paginated messages when user tries to ' +
      'get messages from group he belongs', (done) => {
      request(app)
        .get('/api/v1/group/99/message?page=1')
        .set({ 'x-auth': token })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          assert.exists(res.body.pages); // pages to display in front end
          assert.exists(res.body.count); // total count of messages
          assert.exists(res.body.rows); // array of messages as returned by Sequelize
          done();
        });
    });
  });
  // Test suite for Viewing a single message
  describe('Get api/v1/group/:groupId/message/:messageId', () => {
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
    // create a message
    // {id: 8, groupId: 99, userId: 5, body: 'Carry Something .....'} Message
    before(seeder.addMessageToDb);
    // {id: 9, groupId: 100, userId: 20,
    // body: 'Carry Something more than .....'} Message
    before(seeder.addMessageToDb2);
    // {id: 10, groupId: 99, userId: 5, body: 'Learners are leaders .....'} Message
    before(seeder.addMessageToDb3);
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
    it('Should return 400 when a user access route with invalid groupId.', (done) => {
      request(app)
        .get('/api/v1/group/x/message/1')
        .set({ 'x-auth': token })
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body, 'Invalid request. Parameter groupId must be a number');
          done();
        });
    });
    it('Should return 400 when a user access route with invalid messageId.', (done) => {
      request(app)
        .get('/api/v1/group/20/message/y')
        .set({ 'x-auth': token })
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body, 'Invalid request. Parameter groupId must be a number');
          done();
        });
    });
    it('Should return 400 when a user access invalid group.', (done) => {
      request(app)
        .get('/api/v1/group/40/message/8')
        .set({ 'x-auth': token })
        .expect(404)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body, 'invalid group');
          done();
        });
    });
    it('Should return status code 400 when user tries to view message of a' +
      ' group he doesn\'t belong', (done) => {
      request(app)
        .get('/api/v1/group/100/message/9')
        .set({ 'x-auth': token })
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body, 'Invalid Operation: You don\'t belong to this group');
          done();
        });
    });
    it('Should return status code 404 when user tries ' +
      'to view message that doesn\'t exist', (done) => {
      request(app)
        .get('/api/v1/group/99/message/25')
        .set({ 'x-auth': token })
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body, 'message not found');
          done();
        });
    });
    it('Should return status code 200 and the message when user tries to view message from' +
      ' group he/she belongs', (done) => {
      request(app)
        .get('/api/v1/group/99/message/8')
        .set({ 'x-auth': token })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          assert.exists(res.body); // res.body is the message body
          done();
        });
    });
  });
  // Test suite for controller that update Read status of message
  describe('POST api/v1/group/message-read/:messageId', () => {
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
    // create a message
    // {id: 8, groupId: 99, userId: 5, body: 'Carry Something .....'} Message
    before(seeder.addMessageToDb);
    // {id: 9, groupId: 100, userId: 20,
    // body: 'Carry Something more than .....'} Message
    before(seeder.addMessageToDb2);
    // {id: 10, groupId: 99, userId: 5, body: 'Learners are leaders .....'} Message
    before(seeder.addMessageToDb3);
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
    it('Should return 400 when a user access route with invalid messageId.',
      (done) => {
        request(app)
          .post('/api/v1/group/message-read/x')
          .set({ 'x-auth': token })
          .expect(400)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body, 'Invalid request. Parameter groupId must be a number');
            done();
          });
      });
    it('Should return 404 and a message when a user provide ' +
      'messageId that doesn\'t exist.', (done) => {
      request(app)
        .post('/api/v1/group/message-read/21')
        .set({ 'x-auth': token })
        .expect(404)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body, 'Message with this ID doesn\'t exist');
          done();
        });
    });
    it('Should return 400 when a user provides messageId of ' +
      'group he doesn\'t belong.', (done) => {
      request(app)
        .post('/api/v1/group/message-read/9')
        .set({ 'x-auth': token })
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body, 'You don\'t belong to this group');
          done();
        });
    });
    it('Should return status code 200 and true value when message ' +
      'read status is updated', (done) => {
      request(app)
        .post('/api/v1/group/message-read/8')
        .set({ 'x-auth': token })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body, true);
          done();
        });
    });
  });
});
