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
// describe('POST: api/group', () => {
//   // Clear Test database
//   before(seeder.emptyUserDB);
//   before(seeder.emptyMessageDB);
//   before(seeder.emptyGroupDB);
//   before(seeder.emptyUserGroupDB);
//   // Start adding users to DB
//   before(seeder.addUserToDb); // username = johadi10
//   before(seeder.addUserToDb2); // username = oman
//   // Create a group
//   before(seeder.createGroup); // name=andela creator_id = 1 id = 1
//   let token = ''; // To hold our token for authentication
//   it('Should return 200 and give the user token if credentials are correct.', (done) => {
//     request(app)
//         .post('/api/user/signin')
//         .send({ username: 'johadi10', password: '11223344' })
//         .expect(200)
//         .end((err, res) => {
//           if (err) return done(err);
//           token = res.body;
//           done();
//         });
//   });
//   // Test for creating group
//   it('Should return status code 400 and a message when input are invalid. i.e some empty fields', (done) => {
//     request(app)
//         .post('/api/group')
//         .send({ name: '', token })
//         .expect(400)
//         .end((err, res) => {
//           if (err) return done(err);
//           assert.equal(res.body, 'Group name required');
//           done();
//         });
//   });
//   it('should return status code 400 and a message when group already exists', (done) => {
//     request(app)
//         .post('/api/group')
//         .send({ name: 'andela', token })
//         .expect(400)
//         .end((err, res) => {
//           if (err) return done(err);
//           assert.equal(res.body, 'This Group already exists');
//           done();
//         });
//   });
//   it('Should return status code 201 and create Group if all is well', (done) => {
//     request(app)
//         .post('/api/group')
//         .send({ name: 'Lagos', token })
//         .expect(201)
//         .end((err, res) => {
//           if (err) return done(err);
//           Group.findOne({
//             where: { name: 'lagos' } // NOTE: lagos must be lowercase
//           })
//               .then((group) => {
//                 assert.equal(group.name, 'lagos');
//                 done();
//               })
//               .catch(err => done(err));
//         });
//   });
// });
// //* Test for adding user to group
// describe('POST api/group/:groupId/user', () => {
//   // Clear Test database
//   before(seeder.emptyUserDB);
//   before(seeder.emptyMessageDB);
//   before(seeder.emptyGroupDB);
//   before(seeder.emptyUserGroupDB);
//   // Start adding users to DB
//   before(seeder.addUserToDb); // {id: 5, username: johadi10, email: johadi10@yahoo.com}
//   before(seeder.addUserToDb2); // {id: 20, username: oman, email: oman@gmail.com}
//   before(seeder.addUserToDb3); // {id: 30, username: sherif, email: sherif@gmail.com}
//   // Create a group
//   before(seeder.createGroup); // {id: 99, name: andela, creator_id: 1}
//   before(seeder.createGroup2); // {id: 100, name: react, creator_id: 7}
//   before(seeder.addUserToGroup); // {groupId: 100, userId: 10}
//   before(seeder.addUserToGroup2); // {groupId: 99, userId: 5}
//   before(seeder.addUserToGroup4); // {groupId: 99, userId: 20}
//   let token = ''; // To hold our token for authentication
//   it('Should return 200 and give the user token if credentials are correct.', (done) => {
//     request(app)
//         .post('/api/user/signin')
//         .send({ username: 'johadi10', password: '11223344' })
//         .expect(200)
//         .end((err, res) => {
//           if (err) return done(err);
//           token = res.body;
//           done();
//         });
//   });
//   // before(seeder.addUserToDb);
//   it('Should return status code 400 and a message when groupId is not a number.', (done) => {
//     request(app)
//         .post('/api/group/x/user')
//         .send({ user: 'johadi10', token })
//         .expect(400)
//         .end((err, res) => {
//           if (err) return done(err);
//           assert.equal(res.body, 'Oops! Something went wrong, Check your route');
//           done();
//         });
//   });
//   it('Should return status code 400 and a message if group name field is empty', (done) => {
//     request(app)
//         .post('/api/group/1/user')
//         .send({ user: '', token })
//         .expect(400)
//         .end((err, res) => {
//           if (err) return done(err);
//           assert.equal(res.body, 'Provide Valid user detail to add to group');
//           done();
//         });
//   });
//   it('Should return status code 400 and a ' +
//       'message when User tries to add himself to group he belongs.', (done) => {
//     request(app)
//         .post('/api/group/99/user')
//         .send({ user: 'johadi10', token })
//         .expect(400)
//         .end((err, res) => {
//           if (err) return done(err);
//           assert.equal(res.body, 'You can\'t add yourself to group you already belong');
//           done();
//         });
//   });
//   it('Should return status code 400 and a ' +
//       'message when User tries to add user to group he doesn\'t belongs.', (done) => {
//     request(app)
//         .post('/api/group/100/user')
//         .send({ user: 'johadi10', token })
//         .expect(400)
//         .end((err, res) => {
//           if (err) return done(err);
//           assert.equal(res.body, 'Invalid operation: you do not belong to this group');
//           done();
//         });
//   });
//   it('Should return status code 400 and a ' +
//       'message when User tries to add user already in a group.', (done) => {
//     request(app)
//         .post('/api/group/99/user')
//         .send({ user: 'oman', token })
//         .expect(400)
//         .end((err, res) => {
//           if (err) return done(err);
//           assert.equal(res.body, 'User already belongs to this group');
//           done();
//         });
//   });
//   it('Should return status code 404 and a ' +
//       'message when User tries to add user that doesn\'t exist.', (done) => {
//     request(app)
//         .post('/api/group/99/user')
//         .send({ user: 'sanni', token })
//         .expect(404)
//         .end((err, res) => {
//           if (err) return done(err);
//           assert.equal(res.body, 'User not found');
//           done();
//         });
//   });
//   it('Should return 404 and a message if groupId is invalid.', (done) => {
//     request(app)
//         .post('/api/group/6/user')
//         .send({ user: 'oman', token })
//         .expect(404)
//         .end((err, res) => {
//           if (err) return done(err);
//           assert.equal(res.body, 'Invalid group');
//           done();
//         });
//   });
//   it('Should return 201 and information of who added user and who was added.', (done) => {
//     request(app)
//         .post('/api/group/99/user')
//         .send({ user: 'sherif', token })
//         .expect(201)
//         .end((err, res) => {
//           if (err) return done(err);
//           assert.equal(res.body.message, 'User added successfully');
//           assert.equal(res.body.addedUser, 'sherif'); // user that was added
//           assert.equal(res.body.addedBy, 'johadi10'); // user that added is user which is johadi10
//           done();
//         });
//   });
// }); // end
// Test suite for posting a message
// describe('POST api/group/:groupId/message', () => {
//   // Clear Test database
//   before(seeder.emptyUserDB);
//   before(seeder.emptyMessageDB);
//   before(seeder.emptyGroupDB);
//   before(seeder.emptyUserGroupDB);
//   // Add users to DB
//   before(seeder.addUserToDb); // {id: 5, username: johadi10, email: johadi10@yahoo.com} User
//   before(seeder.addUserToDb2); // {id: 20, username: oman, email: oman@gmail.com} User
//   before(seeder.addUserToDb3); // {id: 30, username: sherif, email: sherif@gmail.com} User
//   // Create a group
//   before(seeder.createGroup); // {id: 99, name: andela, creator_id: 1} Group
//   before(seeder.createGroup2); // {id: 100, name: react, creator_id: 7} Group
//   // Add users to groups
//   before(seeder.addUserToGroup); // {groupId: 100, userId: 10} UserGroup
//   before(seeder.addUserToGroup2); // {groupId: 99, userId: 5} UserGroup
//   before(seeder.addUserToGroup4); // {groupId: 99, userId: 20} UserGroup
//   // create a message
//   before(seeder.addMessageToDb); // {groupId: 99, userId: 5, body: 'Carry Something .....'}
//   let token = ''; // To hold our token for authentication
//   it('Should return 200 and give the user token if credentials are correct.', (done) => {
//     request(app)
//         .post('/api/user/signin')
//         .send({ username: 'johadi10', password: '11223344' })
//         .expect(200)
//         .end((err, res) => {
//           if (err) return done(err);
//           token = res.body;
//           done();
//         });
//   });
//   it('Should return status code 400 and a message when groupId is not a number.', (done) => {
//     request(app)
//         .post('/api/group/x/message')
//         .send({ message: 'no condition is permanent', token })
//         .expect(400)
//         .end((err, res) => {
//           if (err) return done(err);
//           assert.equal(res.body, 'Oops! Something went wrong, Check your route');
//           done();
//         });
//   });
//   it('Should return 400 and a message if no message body', (done) => {
//     request(app)
//         .post('/api/group/99/message')
//         .send({ message: '', token })
//         .expect(400)
//         .end((err, res) => {
//           if (err) return done(err);
//           assert.equal(res.body, 'Message body required');
//           done();
//         });
//   });
//   it('Should return 400 and a message if priority level not either normal, urgent or critical', (done) => {
//     request(app)
//         .post('/api/group/99/message')
//         .send({ message: 'I love NodeJS', priority: 'abnormal', token })
//         .expect(400)
//         .end((err, res) => {
//           if (err) return done(err);
//           assert.equal(res.body, 'Message priority level can only be normal or urgent or critical');
//           done();
//         });
//   });
//   it('Should return 404 and a message if group is invalid', (done) => {
//     request(app)
//         .post('/api/group/70/message')
//         .send({ message: 'I love NodeJS', priority: 'critical', token })
//         .expect(404)
//         .end((err, res) => {
//           if (err) return done(err);
//           assert.equal(res.body, 'Invalid group');
//           done();
//         });
//   });
//   it('Should return 400 and a message if user doesn\'t belong to a group', (done) => {
//     request(app)
//         .post('/api/group/100/message')
//         .send({ message: 'I love NodeJS', priority: 'critical', token })
//         .expect(400)
//         .end((err, res) => {
//           if (err) return done(err);
//           assert.equal(res.body, 'Invalid Operation: You can\'t post to group You don\'t belong');
//           done();
//         });
//   });
//   it('Should return 201 and a message if message was successfully posted', (done) => {
//     request(app)
//         .post('/api/group/99/message')
//         .send({ message: 'I love NodeJS', priority: 'critical', token })
//         .expect(201)
//         .end((err, res) => {
//           if (err) return done(err);
//           assert.equal(res.body, 'Message created successfully');
//           done();
//         });
//   });
// });
// describe('Get api/group/groupId/message', () => {
//   // Clear Test database
//   before(seeder.emptyUserDB);
//   before(seeder.emptyMessageDB);
//   before(seeder.emptyGroupDB);
//   before(seeder.emptyUserGroupDB);
//   // Add users to DB
//   before(seeder.addUserToDb); // {id: 5, username: johadi10, email: johadi10@yahoo.com} User
//   before(seeder.addUserToDb2); // {id: 20, username: oman, email: oman@gmail.com} User
//   before(seeder.addUserToDb3); // {id: 30, username: sherif, email: sherif@gmail.com} User
//   // Create a group
//   before(seeder.createGroup); // {id: 99, name: andela, creator_id: 1} Group
//   before(seeder.createGroup2); // {id: 100, name: react, creator_id: 7} Group
//   // Add users to groups
//   before(seeder.addUserToGroup); // {groupId: 100, userId: 10} UserGroup
//   before(seeder.addUserToGroup2); // {groupId: 99, userId: 5} UserGroup
//   before(seeder.addUserToGroup4); // {groupId: 99, userId: 20} UserGroup
//   // create a message
//   before(seeder.addMessageToDb); // {groupId: 99, userId: 5, body: 'Carry Something .....'}
//   before(seeder.addMessageToDb2); // {groupId: 100, userId: 20, body: 'Carry Something more than .....'}
//   before(seeder.addMessageToDb3); // {groupId: 99, userId: 5, body: 'Learners are leaders .....'}
//   let token = ''; // To hold our token for authentication
//   it('Should return 200 and give the user token if credentials are correct.', (done) => {
//     request(app)
//         .post('/api/user/signin')
//         .send({ username: 'johadi10', password: '11223344' })
//         .expect(200)
//         .end((err, res) => {
//           if (err) return done(err);
//           token = res.body;
//           done();
//         });
//   });
//   it('Should return 400 when a user access invalid route.', (done) => {
//     request(app)
//         .get('/api/group/x/message')
//         .set({ 'x-auth': token })
//         .expect(400)
//         .end((err, res) => {
//           if (err) return done(err);
//           assert.equal(res.body, 'Oops! Something went wrong, Check your route');
//           done();
//         });
//   });
//   it('Should return 400 when a user doesn\'t provide query parameter "page" ' +
//       'that serves as pagination.', (done) => {
//     request(app)
//         .get('/api/group/99/message')
//         .set({ 'x-auth': token })
//         .expect(400)
//         .end(done);
//   });
//   it('Should return 400 when a user access invalid group.', (done) => {
//     request(app)
//         .get('/api/group/33/message?page=1')
//         .set({ 'x-auth': token })
//         .expect(404)
//         .end((err, res) => {
//           if (err) return done(err);
//           assert.equal(res.body, 'invalid group');
//           done();
//         });
//   });
//   it('Should return status code 400 when user tries to get messages from' +
//       ' group he doesn\'t belong', (done) => {
//     request(app)
//         .get('/api/group/100/message?page=1')
//         .set({ 'x-auth': token })
//         .expect(400)
//         .end((err, res) => {
//           if (err) return done(err);
//           assert.equal(res.body, 'Invalid Operation: You don\'t belong to this group');
//           done();
//         });
//   });
//   it('Should return status code 200 when user tries to get messages from' +
//       ' group he belongs', (done) => {
//     request(app)
//         .get('/api/group/99/message?page=1')
//         .set({ 'x-auth': token })
//         .expect(200)
//         .end((err, res) => {
//           if (err) return done(err);
//           assert.exists(res.body.pages); // pages to display in front end
//           assert.exists(res.body.count); // total count of messages
//           assert.exists(res.body.rows); // rows is the array of messages as returned by Sequelize
//           done();
//         });
//   });
// });
// Test suite for Viewing a single message
// describe('Get api/group/:groupId/message/:messageId', () => {
//   // Clear Test database
//   before(seeder.emptyUserDB);
//   before(seeder.emptyMessageDB);
//   before(seeder.emptyGroupDB);
//   before(seeder.emptyUserGroupDB);
//   // Add users to DB
//   before(seeder.addUserToDb); // {id: 5, username: johadi10, email: johadi10@yahoo.com} User
//   before(seeder.addUserToDb2); // {id: 20, username: oman, email: oman@gmail.com} User
//   before(seeder.addUserToDb3); // {id: 30, username: sherif, email: sherif@gmail.com} User
//   // Create a group
//   before(seeder.createGroup); // {id: 99, name: andela, creator_id: 1} Group
//   before(seeder.createGroup2); // {id: 100, name: react, creator_id: 7} Group
//   // Add users to groups
//   before(seeder.addUserToGroup); // {groupId: 100, userId: 10} UserGroup
//   before(seeder.addUserToGroup2); // {groupId: 99, userId: 5} UserGroup
//   before(seeder.addUserToGroup4); // {groupId: 99, userId: 20} UserGroup
//   // create a message
//   before(seeder.addMessageToDb); // {id: 8, groupId: 99, userId: 5, body: 'Carry Something .....'} Message
//   before(seeder.addMessageToDb2); // {id: 9, groupId: 100, userId: 20, body: 'Carry Something more than .....'} Message
//   before(seeder.addMessageToDb3); // {id: 10, groupId: 99, userId: 5, body: 'Learners are leaders .....'} Message
//   let token = ''; // To hold our token for authentication
//   it('Should return 200 and give the user token if credentials are correct.', (done) => {
//     request(app)
//         .post('/api/user/signin')
//         .send({ username: 'johadi10', password: '11223344' })
//         .expect(200)
//         .end((err, res) => {
//           if (err) return done(err);
//           token = res.body;
//           done();
//         });
//   });
//   it('Should return 400 when a user access route with invalid groupId.', (done) => {
//     request(app)
//         .get('/api/group/x/message/1')
//         .set({ 'x-auth': token })
//         .expect(400)
//         .end((err, res) => {
//           if (err) return done(err);
//           assert.equal(res.body, 'Oops! Something went wrong, Check your route');
//           done();
//         });
//   });
//   it('Should return 400 when a user access route with invalid messageId.', (done) => {
//     request(app)
//         .get('/api/group/20/message/y')
//         .set({ 'x-auth': token })
//         .expect(400)
//         .end((err, res) => {
//           if (err) return done(err);
//           assert.equal(res.body, 'Oops! Something went wrong, Check your route');
//           done();
//         });
//   });
//   it('Should return 400 when a user access invalid group.', (done) => {
//     request(app)
//         .get('/api/group/40/message/8')
//         .set({ 'x-auth': token })
//         .expect(404)
//         .end((err, res) => {
//           if (err) return done(err);
//           assert.equal(res.body, 'invalid group');
//           done();
//         });
//   });
//   it('Should return status code 400 when user tries to view message of a' +
//       ' group he doesn\'t belong', (done) => {
//     request(app)
//         .get('/api/group/100/message/9')
//         .set({ 'x-auth': token })
//         .expect(400)
//         .end((err, res) => {
//           if (err) return done(err);
//           assert.equal(res.body, 'Invalid Operation: You don\'t belong to this group');
//           done();
//         });
//   });
//   it('Should return status code 404 when user tries to view message that doesn\'t exist', (done) => {
//     request(app)
//         .get('/api/group/99/message/25')
//         .set({ 'x-auth': token })
//         .expect(400)
//         .end((err, res) => {
//           if (err) return done(err);
//           assert.equal(res.body, 'message not found');
//           done();
//         });
//   });
//   it('Should return status code 200 and the message when user tries to view message from' +
//       ' group he/she belongs', (done) => {
//     request(app)
//         .get('/api/group/99/message/8')
//         .set({ 'x-auth': token })
//         .expect(200)
//         .end((err, res) => {
//           if (err) return done(err);
//           assert.exists(res.body); // res.body is the message body
//           done();
//         });
//   });
// });
// Test suite for controller that update Read status of message
describe('POST api/group/message-read/:messageId', () => {
  // Clear Test database
  before(seeder.emptyUserDB);
  before(seeder.emptyMessageDB);
  before(seeder.emptyGroupDB);
  before(seeder.emptyUserGroupDB);
  // Add users to DB
  before(seeder.addUserToDb); // {id: 5, username: johadi10, email: johadi10@yahoo.com} User
  before(seeder.addUserToDb2); // {id: 20, username: oman, email: oman@gmail.com} User
  before(seeder.addUserToDb3); // {id: 30, username: sherif, email: sherif@gmail.com} User
  // Create a group
  before(seeder.createGroup); // {id: 99, name: andela, creator_id: 1} Group
  before(seeder.createGroup2); // {id: 100, name: react, creator_id: 7} Group
  // Add users to groups
  before(seeder.addUserToGroup); // {groupId: 100, userId: 10} UserGroup
  before(seeder.addUserToGroup2); // {groupId: 99, userId: 5} UserGroup
  before(seeder.addUserToGroup4); // {groupId: 99, userId: 20} UserGroup
  // create a message
  before(seeder.addMessageToDb); // {id: 8, groupId: 99, userId: 5, body: 'Carry Something .....'} Message
  before(seeder.addMessageToDb2); // {id: 9, groupId: 100, userId: 20, body: 'Carry Something more than .....'} Message
  before(seeder.addMessageToDb3); // {id: 10, groupId: 99, userId: 5, body: 'Learners are leaders .....'} Message
  let token = ''; // To hold our token for authentication
  it('Should return 200 and give the user token if credentials are correct.', (done) => {
    request(app)
        .post('/api/user/signin')
        .send({ username: 'johadi10', password: '11223344' })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          token = res.body;
          done();
        });
  });
  it('Should return 400 when a user access route with invalid messageId.', (done) => {
    request(app)
        .post('/api/group/message-read/x')
        .set({ 'x-auth': token })
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body, 'Oops! Something went wrong, Check your route');
          done();
        });
  });
  it('Should return 404 and a message when a user provide messageId that doesn\'t exist.', (done) => {
    request(app)
        .post('/api/group/message-read/21')
        .set({ 'x-auth': token })
        .expect(404)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body, 'Message with this ID doesn\'t exist');
          done();
        });
  });
  it('Should return 400 when a user provides messageId of group he doesn\'t belong.', (done) => {
    request(app)
        .post('/api/group/message-read/9')
        .set({ 'x-auth': token })
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body, 'You don\'t belong to this group');
          done();
        });
  });
  it('Should return status code 200 and true value when message read status is updated', (done) => {
    request(app)
        .post('/api/group/message-read/8')
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
describe('Get api/group/:groupId/group-users', () => {
  // Clear Test database
  before(seeder.emptyUserDB);
  before(seeder.emptyMessageDB);
  before(seeder.emptyGroupDB);
  before(seeder.emptyUserGroupDB);
  // Add users to DB
  before(seeder.addUserToDb); // {id: 5, username: johadi10, email: johadi10@yahoo.com} User
  before(seeder.addUserToDb2); // {id: 20, username: oman, email: oman@gmail.com} User
  before(seeder.addUserToDb3); // {id: 30, username: sherif, email: sherif@gmail.com} User
  // Create a group
  before(seeder.createGroup); // {id: 99, name: andela, creator_id: 1} Group
  before(seeder.createGroup2); // {id: 100, name: react, creator_id: 7} Group
  // Add users to groups
  before(seeder.addUserToGroup); // {groupId: 100, userId: 10} UserGroup
  before(seeder.addUserToGroup2); // {groupId: 99, userId: 5} UserGroup
  before(seeder.addUserToGroup4); // {groupId: 99, userId: 20} UserGroup
  // create a message
  before(seeder.addMessageToDb); // {id: 8, groupId: 99, userId: 5, body: 'Carry Something .....'} Message
  before(seeder.addMessageToDb2); // {id: 9, groupId: 100, userId: 20, body: 'Carry Something more than .....'} Message
  before(seeder.addMessageToDb3); // {id: 10, groupId: 99, userId: 5, body: 'Learners are leaders .....'} Message
  let token = ''; // To hold our token for authentication
  it('Should return 200 and give the user token if credentials are correct.', (done) => {
    request(app)
        .post('/api/user/signin')
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
        .get('/api/group/x/group-users')
        .set({ 'x-auth': token })
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body, 'Oops! Something went wrong, Check your route');
          done();
        });
  });
  it('Should return 400 when a user access route without query string named page that indicate pagination.', (done) => {
    request(app)
        .get('/api/group/99/group-users')
        .set({ 'x-auth': token })
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body, 'Oops! Error. Request url must have query string named page with number as value');
          done();
        });
  });
  it('Should return 400 when a user access route with query string named page but not a number value.', (done) => {
    request(app)
        .get('/api/group/99/group-users?page=x')
        .set({ 'x-auth': token })
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body, 'Oops! Error. Request url must have query string named page with number as value');
          done();
        });
  });
  it('Should return 404 when a user access invalid group.', (done) => {
    request(app)
        .get('/api/group/40/group-users?page=1')
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
        .get('/api/group/100/group-users?page=1')
        .set({ 'x-auth': token })
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          assert.equal(res.body, 'Invalid Operation: You don\'t belong to this group');
          done();
        });
  });
  it('Should return status code 200 and the users in the group when user tries to get users of a' +
      ' group he/she belongs', (done) => {
    request(app)
        .get('/api/group/99/group-users?page=1')
        .set({ 'x-auth': token })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          assert.exists(res.body.Users); // array of Users in the group
          assert.exists(res.body.name); // name of the group
          assert.exists(res.body.pages); // pages the users can make per page
          assert.exists(res.body.count); // number of users in the group
          done();
        });
  });
});