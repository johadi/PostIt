// require('dotenv').config();
// // auth.test.js
// const request = require('supertest');
// const assert = require('chai').assert;
// const app = require('./../../app');
// const seeder = require('./seed/group_seed');
// const User = require('./../database/models').User;
// const Group = require('./../database/models').Group;
// const UserGroup = require('./../database/models').UserGroup;
// const UserGroupAdd = require('./../database/models').UserGroupAdd;
// const Message = require('./../database/models').Message;
// const db = require('./../database/models');
// // Test for creating group route and controller
// describe('POST: api/group', () => {
//   // Clear Test database
//   before(seeder.emptyUserDB);
//   before(seeder.emptyMessageDB);
//   before(seeder.emptyGroupDB);
//   before(seeder.emptyUserGroupDB);
//   // Start adding users to DB
//   before(seeder.addUserToDb);
//   before(seeder.addUserToDb2);
//   // Create a group
//   before(seeder.createGroup);
//   let token = ''; // To hold our token for authentication
//   it('Should return 200 and give the user token if credentials are correct.', (done) => {
//     request(app)
//         .post('/api/user/signin')
//         .send({ username: 'johadi10', password: '11223344' })
//         .expect(200)
//         .end((err, res) => {
//           if (err) return done(err);
//           token = res.body.token;
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
//         .send({ name: 'Andela', token })
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
//             where: { name: 'lagos' } // NOTE: bootcamp must be lowercase
//           })
//               .then((group) => {
//                 assert.equal(group.name, 'lagos');
//                 done();
//               })
//               .catch(err => done(err));
//         });
//   });
// });
// // Test for adding user to group
// describe('POST api/group/:groupId/user', () => {
//   // Clear Test database
//   before(seeder.emptyUserDB);
//   before(seeder.emptyMessageDB);
//   before(seeder.emptyGroupDB);
//   before(seeder.emptyUserGroupDB);
//   // Start adding users to DB
//   before(seeder.addUserToDb);
//   before(seeder.addUserToDb2);
//   // Create a group
//   before(seeder.createGroup);
//   before(seeder.createGroup2);
//   before(seeder.addUserToGroup);
//   let token = ''; // To hold our token for authentication
//   it('Should return 200 and give the user token if credentials are correct.', (done) => {
//     request(app)
//         .post('/api/user/signin')
//         .send({ username: 'johadi10', password: '11223344' })
//         .expect(200)
//         .end((err, res) => {
//           if (err) return done(err);
//           token = res.body.token;
//           done();
//         });
//   });
//   // Create group and get a sample for it from DB
//   let groupId = '';
//   it('Should return 200 and give the user token if credentials are correct.', (done) => {
//     Group.create({
//       name: 'london',
//       creator_id: 1
//     })
//         .then((group) => {
//           if (!group) {
//             return Promise.reject('Error');
//           }
//           groupId = group.id;
//           return done();
//         })
//         .catch(err => done(err));
//   });
//   let groupId2 = '';
//   it('Should return 200 and give the user token if credentials are correct.', (done) => {
//     UserGroup.create({
//       groupId: 2,
//       userId: 1
//     })
//         .then((userToGroup) => {
//           if (!userToGroup) {
//             return Promise.reject('Error');
//           }
//           return UserGroupAdd.create({
//             addedById: 1,
//             addedToId: 1,
//             groupId: 1
//           });
//         })
//         .then((user) => {
//
//         })
//         .catch(err => done(err));
//   });
//   // Empty our database
//   // before(seeder.emptyDB);
//   /* Seed database for this testing
//    fullname: 'jimoh hadi',
//    username: 'ovenje',
//    email: 'ovenje@yahoo.com',
//    mobile: '8163041269',
//    password: '11223344'
//    */
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
//         .post('/api/group/1/user')
//         .send({ user: 'johadi10', token })
//         .expect(400)
//         .end((err, res) => {
//           if (err) return done(err);
//           assert.equal(res.body, 'Already a member. You can\'t add yourself to the group again');
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
//   it('Should return 400 and a message if user not a member of a group.', (done) => {
//     request(app)
//         .post(`/api/group/${groupId}/user`)
//         .send({ user: 'oman', token })
//         .expect(400)
//         .end((err, res) => {
//           if (err) return done(err);
//           assert.equal(res.body, 'Invalid operation: you do not belong to this group');
//           done();
//         });
//   });
//   it('Should return 404 and a message if User to add does not exist.', (done) => {
//     request(app)
//         .post(`/api/group/${groupId}/user`)
//         .send({ user: 'mark', token })
//         .expect(404)
//         .end((err, res) => {
//           if (err) return done(err);
//           assert.equal(res.body, 'User not found');
//           done();
//         });
//   });
// });
// // describe('POST api/group/groupId/message', () => {
// //   // Empty our database
// //   before(seeder.emptyDB);
// //   // Seed database for this testing
// //   /* User: {
// //    fullname: 'jimoh hadi',
// //    username: 'ovenje',
// //    email: 'ovenje@yahoo.com',
// //    mobile: '8163041269',
// //    password: '11223344' }
// //    */
// //   before(seeder.addUserToDb);
// //   it('Should return status code 400 and a message when input are invalid. i.e some empty fields', (done) => {
// //     request(app)
// //         .post('/api/user/signin')
// //         .send(seeder.setLoginData('', '11223344'))
// //         .expect(400)
// //         .end((err, res) => {
// //           if (err) return done(err);
// //           assert.equal(res.body, 'There are problems with your input');
// //           done();
// //         });
// //   });
// //   it('Should return status code 404 and a message if User not found', (done) => {
// //     request(app)
// //         .post('/api/user/signin')
// //         .send(seeder.setLoginData('jimoh', '11223344'))
// //         .expect(404)
// //         .end((err, res) => {
// //           if (err) return done(err);
// //           assert.equal(res.body, 'User not found');
// //           done();
// //         });
// //   });
// //   it('Should return status code 400 and a message when password is incorrect.', (done) => {
// //     request(app)
// //         .post('/api/user/signin')
// //         .send(seeder.setLoginData('ovenje', '11223366'))
// //         .expect(400)
// //         .end((err, res) => {
// //           if (err) return done(err);
// //           assert.equal(res.body, 'Incorrect password');
// //           done();
// //         });
// //   });
// //   it('Should return 200 and give the user token if credentials are correct.', (done) => {
// //     request(app)
// //         .post('/api/user/signin')
// //         .send(seeder.setLoginData('ovenje', '11223344'))
// //         .expect(200)
// //         .end((err, res) => {
// //           if (err) return done(err);
// //           assert.equal(res.body.message, 'Sign in successful');
// //           assert.exists(res.body.token);
// //           done();
// //         });
// //   });
// // });
// // describe('Get api/group/groupId/message', () => {
// //   // Empty our database
// //   before(seeder.emptyDB);
// //   // Seed database for this testing
// //   /* User: {
// //    fullname: 'jimoh hadi',
// //    username: 'ovenje',
// //    email: 'ovenje@yahoo.com',
// //    mobile: '8163041269',
// //    password: '11223344' }
// //    */
// //   before(seeder.addUserToDb);
// //   it('Should return status code 400 and a message when input are invalid. i.e some empty fields', (done) => {
// //     request(app)
// //         .post('/api/user/signin')
// //         .send(seeder.setLoginData('', '11223344'))
// //         .expect(400)
// //         .end((err, res) => {
// //           if (err) return done(err);
// //           assert.equal(res.body, 'There are problems with your input');
// //           done();
// //         });
// //   });
// //   it('Should return status code 404 and a message if User not found', (done) => {
// //     request(app)
// //         .post('/api/user/signin')
// //         .send(seeder.setLoginData('jimoh', '11223344'))
// //         .expect(404)
// //         .end((err, res) => {
// //           if (err) return done(err);
// //           assert.equal(res.body, 'User not found');
// //           done();
// //         });
// //   });
// //   it('Should return status code 400 and a message when password is incorrect.', (done) => {
// //     request(app)
// //         .post('/api/user/signin')
// //         .send(seeder.setLoginData('ovenje', '11223366'))
// //         .expect(400)
// //         .end((err, res) => {
// //           if (err) return done(err);
// //           assert.equal(res.body, 'Incorrect password');
// //           done();
// //         });
// //   });
// //   it('Should return 200 and give the user token if credentials are correct.', (done) => {
// //     request(app)
// //         .post('/api/user/signin')
// //         .send(seeder.setLoginData('ovenje', '11223344'))
// //         .expect(200)
// //         .end((err, res) => {
// //           if (err) return done(err);
// //           assert.equal(res.body.message, 'Sign in successful');
// //           assert.exists(res.body.token);
// //           done();
// //         });
// //   });
// // });
