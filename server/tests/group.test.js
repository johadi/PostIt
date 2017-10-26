// group.test.js
import dotenv from 'dotenv';
import request from 'supertest';
import chai from 'chai';
import app from './../../app';
import seeder from './seed/group_seed';
import db from './../database/models';

dotenv.config();
const assert = chai.assert;
// Test suit for creating group route and controller
describe('POST: api/v1/group', () => {
  // Clear Test database
  before(seeder.emptyUserDB);
  before(seeder.emptyMessageDB);
  before(seeder.emptyGroupDB);
  before(seeder.emptyUserGroupDB);
  // Start adding users to DB
  before(seeder.addUserToDb); // username = johadi10
  before(seeder.addUserToDb2); // username = oman
  // Create a group
  before(seeder.createGroup); // name=andela creatorId = 1 id = 1
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
  // Test for creating group
  it('Should return status code 400 and a message when input are invalid.' +
    ' i.e some empty fields', (done) => {
    request(app)
      .post('/api/v1/group')
      .send({ name: '', token })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.body, 'Group name required');
        done();
      });
  });
  it('should return status code 400 and a message when group ' +
    'already exists', (done) => {
    request(app)
      .post('/api/v1/group')
      .send({ name: 'andela', token })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.body, 'This Group already exists');
        done();
      });
  });
  it('Should return status code 201 and create Group if all is well', (done) => {
    request(app)
      .post('/api/v1/group')
      .send({ name: 'Lagos', token })
      .expect(201)
      .end((err) => {
        if (err) return done(err);
        db.Group.findOne({
          where: { name: 'lagos' } // NOTE: lagos must be lowercase
        })
          .then((group) => {
            assert.equal(group.name, 'lagos');
            done();
          });
      });
  });
});
// Test suit for adding user to group
describe('POST api/v1/group/:groupId/user', () => {
  // Clear Test database
  before(seeder.emptyUserDB);
  before(seeder.emptyMessageDB);
  before(seeder.emptyGroupDB);
  before(seeder.emptyUserGroupDB);
  // Start adding users to DB
  // {id: 5, username: johadi10, email: johadi10@yahoo.com} User
  before(seeder.addUserToDb);
  // {id: 20, username: oman, email: oman@gmail.com} User
  before(seeder.addUserToDb2);
  // {id: 30, username: sherif, email: sherif@gmail.com} User
  before(seeder.addUserToDb3);
  // Create a group
  before(seeder.createGroup); // {id: 99, name: andela, creatorId: 1}
  before(seeder.createGroup2); // {id: 100, name: react, creatorId: 7}
  before(seeder.addUserToGroup); // {groupId: 100, userId: 10}
  before(seeder.addUserToGroup2); // {groupId: 99, userId: 5}
  before(seeder.addUserToGroup4); // {groupId: 99, userId: 20}
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
  // before(seeder.addUserToDb);
  it('Should return status code 400 and a message when groupId ' +
    'is not a number.', (done) => {
    request(app)
      .post('/api/v1/group/x/user')
      .send({ user: 'johadi10', token })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.body, 'Oops! Something went wrong, Check your route');
        done();
      });
  });
  it('Should return status code 400 and a message if group name field is empty',
    (done) => {
      request(app)
        .post('/api/v1/group/1/user')
        .send({ user: '', token })
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body, 'Provide Valid user detail to add to group');
          done();
        });
    });
  it('Should return status code 400 and a ' +
    'message when User tries to add himself to group he belongs.', (done) => {
    request(app)
      .post('/api/v1/group/99/user')
      .send({ user: 'johadi10', token })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.body, 'You can\'t add yourself to group you already belong');
        done();
      });
  });
  it('Should return status code 400 and a ' +
    'message when User tries to add user to group he doesn\'t belongs.',
    (done) => {
      request(app)
        .post('/api/v1/group/100/user')
        .send({ user: 'johadi10', token })
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body, 'Invalid operation: you do not belong to this group');
          done();
        });
    });
  it('Should return status code 400 and a ' +
    'message when User tries to add user already in a group.', (done) => {
    request(app)
      .post('/api/v1/group/99/user')
      .send({ user: 'oman', token })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.body, 'User already belongs to this group');
        done();
      });
  });
  it('Should return status code 404 and a ' +
    'message when User tries to add user that doesn\'t exist.', (done) => {
    request(app)
      .post('/api/v1/group/99/user')
      .send({ user: 'sanni', token })
      .expect(404)
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.body, 'User not found');
        done();
      });
  });
  it('Should return 404 and a message if groupId is invalid.', (done) => {
    request(app)
      .post('/api/v1/group/6/user')
      .send({ user: 'oman', token })
      .expect(404)
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.body, 'Invalid group');
        done();
      });
  });
  it('Should return 201 and information of who added user and who was added.',
    (done) => {
      request(app)
        .post('/api/v1/group/99/user')
        .send({ user: 'sherif', token })
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body.message, 'User added successfully');
          // user that was added
          assert.equal(res.body.addedUser, 'sherif');
          // user that added is user which is johadi10
          assert.equal(res.body.addedBy, 'johadi10');
          done();
        });
    });
}); // end
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
        assert.equal(res.body, 'Oops! Something went wrong, Check your route');
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
        assert.equal(res.body, 'Oops! Something went wrong, Check your route');
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
        assert.exists(res.body.rows); // rows is the array of messages as returned by Sequelize
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
        assert.equal(res.body, 'Oops! Something went wrong, Check your route');
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
        assert.equal(res.body, 'Oops! Something went wrong, Check your route');
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
          assert.equal(res.body, 'Oops! Something went wrong, Check your route');
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
// Test suite for controllers that get all users of a group
describe('Get api/v1/group/:groupId/group-users', () => {
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
  it('Should return 400 when a user access route with invalid groupId.',
    (done) => {
      request(app)
        .get('/api/v1/group/x/group-users')
        .set({ 'x-auth': token })
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body, 'Oops! Something went wrong, Check your route');
          done();
        });
    });
  it('Should return 400 when a user access route without query string ' +
    'named page that indicate pagination.', (done) => {
    request(app)
      .get('/api/v1/group/99/group-users')
      .set({ 'x-auth': token })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.body, 'Oops! Error. Request url must ' +
          'have query string named page with number as value');
        done();
      });
  });
  it('Should return 400 when a user access route with query string ' +
    'named page but not a number value.', (done) => {
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
  it('Should return status code 400 when user tries to get users of a' +
    ' group he doesn\'t belong', (done) => {
    request(app)
      .get('/api/v1/group/100/group-users?page=1')
      .set({ 'x-auth': token })
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.body, 'Invalid Operation: You don\'t belong to this group');
        done();
      });
  });
  it('Should return status code 200 and the users in the group when user ' +
    'tries to get users of a' +
    ' group he/she belongs on page 1', (done) => {
    request(app)
      .get('/api/v1/group/99/group-users?page=1')
      .set({ 'x-auth': token })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert.exists(res.body.users); // array of Users in the group
        assert.exists(res.body.name); // name of the group
        assert.exists(res.body.pages); // pages the users can make per page
        assert.exists(res.body.count); // number of users in the group
        done();
      });
  });
});
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
// // Test suit for controllers that get all messages
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
// Verify if a User has token or not
describe('Get api/v1/verify-token', () => {
  // Clear Test database
  before(seeder.emptyUserDB);
  before(seeder.emptyMessageDB);
  before(seeder.emptyGroupDB);
  before(seeder.emptyUserGroupDB);
  // Add users to DB
  // {id: 5, username: johadi10, email: johadi10@yahoo.com} User
  before(seeder.addUserToDb);
  // {id: 30, username: sherif, email: sherif@gmail.com} User
  before(seeder.addUserToDb3);
  let sherifToken = '';
  before((done) => {
    request(app)
      .post('/api/v1/user/signin')
      .send({ username: 'sherif', password: '11223344' })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        sherifToken = res.body;
        done();
      });
  });
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
      const testToken = 'xyzjjkjsksdkkldsdskllsdklkdsjcjcjkkjdkj.iiiiw';
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
  it('Should return 404 if user access a route with a valid token but decoded ' +
    'detail in the token not found in database.', (done) => {
    // Let us remove a user from database and use his token for testing here
    db.User.destroy({ where: { username: 'sherif' } })
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
  it('Should return 200 if user provide a valid token that matches ' +
    'database record.', (done) => {
    request(app)
      .get('/api/v1/verify-token')
      .set({ 'x-auth': token })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        assert.equal(res.body.id, 5);
        assert.equal(res.body.fullname, 'jimoh hadi');
        assert.equal(res.body.username, 'johadi10');
        assert.equal(res.body.email, 'johadi10@yahoo.com');
        assert.equal(res.body.mobile, '81630412699');
        assert.notExists(res.body.password);
        done();
      });
  });
});
