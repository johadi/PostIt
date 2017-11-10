// message test
import dotenv from 'dotenv';
import request from 'supertest';
import { assert } from 'chai';
import app from '../../../app';
import groupSeeder from '../seed/groupSeeder';

dotenv.config();

describe('Message API test', () => {
  // Test suite for posting a message
  describe('Post Message to a Group', () => {
    // Clear Test database
    before(groupSeeder.emptyUser);
    before(groupSeeder.emptyMessage);
    before(groupSeeder.emptyGroup);
    before(groupSeeder.emptyUserGroup);
    // Add users to Database
    // {id: 5, username: johadi10, email: johadi10@yahoo.com} User
    before(groupSeeder.addFirstUser);
    // {id: 20, username: oman, email: oman@gmail.com} User
    before(groupSeeder.addSecondUser);
    // {id: 30, username: sherif, email: sherif@gmail.com} User
    before(groupSeeder.addThirdUser);
    // Create a group
    // {id: 99, name: andela, creatorId: 1} Group
    before(groupSeeder.createFirstGroup);
    // {id: 100, name: react, creatorId: 7} Group
    before(groupSeeder.createSecondGroup);
    // Add users to groups
    // {groupId: 100, userId: 10} UserGroup
    before(groupSeeder.addFirstUserGroup);
    // {groupId: 99, userId: 5} UserGroup
    before(groupSeeder.addSecondUserGroup);
    // {groupId: 99, userId: 20} UserGroup
    before(groupSeeder.addFourthUserGroup);
    // create a message
    // {groupId: 99, userId: 5, body: 'Carry Something .....'}
    before(groupSeeder.addFirstMessage);
    let token = ''; // To hold our token for authentication
    before((done) => {
      request(app)
        .post('/api/v1/user/signin')
        .send(groupSeeder.loginDetails)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          token = res.body;
          done();
        });
    });

    it('Should return error messages with status 400 when groupId is not number',
      (done) => {
        request(app)
          .post('/api/v1/group/x/message')
          .send({ message: 'no condition is permanent', token })
          .expect(400)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body,
              'Invalid request. Parameter groupId must be a number');
            done();
          });
      });

    it('Should return status 400 and error message if no message body',
      (done) => {
        const emptyMessage = '';
        request(app)
          .post('/api/v1/group/99/message')
          .send({ message: emptyMessage, token })
          .expect(400)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body, 'Message body required');
            done();
          });
      });

    it('Should return 422 if priority level neither normal, urgent nor critical',
      (done) => {
        const priority = 'abnormal';
        request(app)
          .post('/api/v1/group/99/message')
          .send({ message: 'I love NodeJS', priority, token })
          .expect(422)
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

    it('Should return 403 and a message if user doesn\'t belong to that group',
      (done) => {
        request(app)
          .post('/api/v1/group/100/message')
          .send({ message: 'I love NodeJS', priority: 'critical', token })
          .expect(403)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body, 'Invalid Operation: ' +
              'You can\'t post to group You don\'t belong');
            done();
          });
      });

    it('Should return 201 and a message if message was successfully posted',
      (done) => {
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
  describe('Get Messages in a Group', () => {
    // Clear Test database
    before(groupSeeder.emptyUser);
    before(groupSeeder.emptyMessage);
    before(groupSeeder.emptyGroup);
    before(groupSeeder.emptyUserGroup);
    // Add users to Database
    // {id: 5, username: johadi10, email: johadi10@yahoo.com} User
    before(groupSeeder.addFirstUser);
    // {id: 20, username: oman, email: oman@gmail.com} User
    before(groupSeeder.addSecondUser);
    // {id: 30, username: sherif, email: sherif@gmail.com} User
    before(groupSeeder.addThirdUser);
    // Create a group
    before(groupSeeder.createFirstGroup);
    before(groupSeeder.createSecondGroup);
    // Add users to groups
    before(groupSeeder.addFirstUserGroup);
    before(groupSeeder.addSecondUserGroup);
    before(groupSeeder.addFourthUserGroup);
    // create a message
    // {groupId: 99, userId: 5, body: 'Carry Something .....'}
    before(groupSeeder.addFirstMessage);
    // {groupId: 100, userId: 20, body: 'Carry Something more than...'}
    before(groupSeeder.addSecondMessage);
    // {groupId: 99, userId: 5, body: 'Learners are leaders .....'}
    before(groupSeeder.addThirdMessage);
    let token = ''; // Hold token for authentication
    before((done) => {
      request(app)
        .post('/api/v1/user/signin')
        .send(groupSeeder.loginDetails)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          token = res.body;
          done();
        });
    });

    it('Should return 400 and error message when a user access invalid route.',
      (done) => {
        request(app)
          .get('/api/v1/group/x/message')
          .set({ 'x-auth': token })
          .expect(400)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body,
              'Invalid request. Parameter groupId must be a number');
            done();
          });
      });

    it('Should return 400 when user provide no query parameter "page" for paginated result.',
      (done) => {
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

    it('Should return status 403 when user gets messages from group he doesn\'t belong',
      (done) => {
        request(app)
          .get('/api/v1/group/100/message?page=1')
          .set({ 'x-auth': token })
          .expect(403)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body, 'Invalid Operation: You don\'t belong to this group');
            done();
          });
      });

    it('Should return status code 200 and messages paginated from user\'s groups',
      (done) => {
        request(app)
          .get('/api/v1/group/99/message?page=1')
          .set({ 'x-auth': token })
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            assert.exists(res.body.pages);
            // total count of messages
            assert.exists(res.body.count);
            // array of messages as returned by Sequelize
            assert.exists(res.body.rows);
            done();
          });
      });
  });

  // Test suite for Viewing a single message
  describe('View a Message', () => {
    // Clear Test database
    before(groupSeeder.emptyUser);
    before(groupSeeder.emptyMessage);
    before(groupSeeder.emptyGroup);
    before(groupSeeder.emptyUserGroup);
    // Add users to Database
    // {id: 5, username: johadi10, email: johadi10@yahoo.com}
    before(groupSeeder.addFirstUser);
    // {id: 20, username: oman, email: oman@gmail.com}
    before(groupSeeder.addSecondUser);
    // {id: 30, username: sherif, email: sherif@gmail.com}
    before(groupSeeder.addThirdUser);
    // Create a group
    before(groupSeeder.createFirstGroup);
    before(groupSeeder.createSecondGroup);
    // Add users to groups
    before(groupSeeder.addFirstUserGroup);
    before(groupSeeder.addSecondUserGroup);
    before(groupSeeder.addFourthUserGroup);
    // create a message
    // {id: 8, groupId: 99, userId: 5, body: 'Carry Something .....'}
    before(groupSeeder.addFirstMessage);
    // {id: 9, groupId: 100, userId: 20,
    // body: 'Carry Something more than .....'} Message
    before(groupSeeder.addSecondMessage);
    // {id: 10, groupId: 99, userId: 5, body: 'Learners are leaders .....'}
    before(groupSeeder.addThirdMessage);
    let token = ''; // To hold our token for authentication
    before((done) => {
      request(app)
        .post('/api/v1/user/signin')
        .send(groupSeeder.loginDetails)
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
          .get('/api/v1/group/x/message/1')
          .set({ 'x-auth': token })
          .expect(400)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body,
              'Invalid request. Parameter groupId and messageId must be numbers');
            done();
          });
      });

    it('Should return 400 when a user access route with invalid messageId.',
      (done) => {
        request(app)
          .get('/api/v1/group/20/message/y')
          .set({ 'x-auth': token })
          .expect(400)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body,
              'Invalid request. Parameter groupId and messageId must be numbers');
            done();
          });
      });

    it('Should return 400 when a user accesses invalid group.', (done) => {
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

    it('Should return status 403 when user views message from group he doesn\'t belong',
      (done) => {
        request(app)
          .get('/api/v1/group/100/message/9')
          .set({ 'x-auth': token })
          .expect(403)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body, 'Invalid Operation: You don\'t belong to this group');
            done();
          });
      });

    it('Should return status 404 when user views message that doesn\'t exist',
      (done) => {
        request(app)
          .get('/api/v1/group/99/message/25')
          .set({ 'x-auth': token })
          .expect(404)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body, 'message not found');
            done();
          });
      });

    it('Should return status 200 and message when user views message in his group',
      (done) => {
        request(app)
          .get('/api/v1/group/99/message/8')
          .set({ 'x-auth': token })
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            // res.body is the message body
            assert.exists(res.body);
            done();
          });
      });
  });

  // Test suite for controller that update Read status of message
  describe('Update Message status when read', () => {
    // Clear Test database
    before(groupSeeder.emptyUser);
    before(groupSeeder.emptyMessage);
    before(groupSeeder.emptyGroup);
    before(groupSeeder.emptyUserGroup);
    // Add users to Database
    // {id: 5, username: johadi10, email: johadi10@yahoo.com}
    before(groupSeeder.addFirstUser);
    // {id: 20, username: oman, email: oman@gmail.com}
    before(groupSeeder.addSecondUser);
    // {id: 30, username: sherif, email: sherif@gmail.com}
    before(groupSeeder.addThirdUser);
    // Create a group
    before(groupSeeder.createFirstGroup);
    before(groupSeeder.createSecondGroup);
    // Add users to groups
    before(groupSeeder.addFirstUserGroup);
    before(groupSeeder.addSecondUserGroup);
    before(groupSeeder.addFourthUserGroup);
    // create a message
    // {id: 8, groupId: 99, userId: 5, body: 'Carry Something .....'}
    before(groupSeeder.addFirstMessage);
    // {id: 9, groupId: 100, userId: 20,
    // body: 'Carry Something more than .....'}
    before(groupSeeder.addSecondMessage);
    // {id: 10, groupId: 99, userId: 5, body: 'Learners are leaders .....'}
    before(groupSeeder.addThirdMessage);
    let token = ''; // To hold our token for authentication
    before((done) => {
      request(app)
        .post('/api/v1/user/signin')
        .send(groupSeeder.loginDetails)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          token = res.body;
          done();
        });
    });

    it('Should return 400 when a user accesses route with invalid messageId.',
      (done) => {
        request(app)
          .post('/api/v1/group/message-read/x')
          .set({ 'x-auth': token })
          .expect(400)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body,
              'Invalid request. Parameter messageId must be a number');
            done();
          });
      });

    it('Should return 404 and error message when user provides invalid messageId',
      (done) => {
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

    it('Should return 403 when user provides messageId of group he doesn\'t belong.',
      (done) => {
        request(app)
          .post('/api/v1/group/message-read/9')
          .set({ 'x-auth': token })
          .expect(403)
          .end((err, res) => {
            if (err) return done(err);
            assert.equal(res.body, 'You don\'t belong to this group');
            done();
          });
      });

    it('Should return status 200 with value true when message read status is updated',
      (done) => {
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
