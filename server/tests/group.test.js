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
//
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
//           console.log(res.body);
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
// describe('POST api/group/:groupId/user', () => {
//   // Empty our database
//   before(seeder.emptyDB);
//   // Seed database for this testing
//   /* User: {
//    fullname: 'jimoh hadi',
//    username: 'ovenje',
//    email: 'ovenje@yahoo.com',
//    mobile: '8163041269',
//    password: '11223344' }
//    */
//   before(seeder.addUserToDb);
//   it('Should return status code 400 and a message when input are invalid. i.e some empty fields', (done) => {
//     request(app)
//         .post('/api/user/signin')
//         .send(seeder.setLoginData('', '11223344'))
//         .expect(400)
//         .end((err, res) => {
//           if (err) return done(err);
//           assert.equal(res.body, 'There are problems with your input');
//           done();
//         });
//   });
//   it('Should return status code 404 and a message if User not found', (done) => {
//     request(app)
//         .post('/api/user/signin')
//         .send(seeder.setLoginData('jimoh', '11223344'))
//         .expect(404)
//         .end((err, res) => {
//           if (err) return done(err);
//           assert.equal(res.body, 'User not found');
//           done();
//         });
//   });
//   it('Should return status code 400 and a message when password is incorrect.', (done) => {
//     request(app)
//         .post('/api/user/signin')
//         .send(seeder.setLoginData('ovenje', '11223366'))
//         .expect(400)
//         .end((err, res) => {
//           if (err) return done(err);
//           assert.equal(res.body, 'Incorrect password');
//           done();
//         });
//   });
//   it('Should return 200 and give the user token if credentials are correct.', (done) => {
//     request(app)
//         .post('/api/user/signin')
//         .send(seeder.setLoginData('ovenje', '11223344'))
//         .expect(200)
//         .end((err, res) => {
//           if (err) return done(err);
//           assert.equal(res.body.message, 'Sign in successful');
//           assert.exists(res.body.token);
//           done();
//         });
//   });
// });
// describe('POST api/group/groupId/message', () => {
//   // Empty our database
//   before(seeder.emptyDB);
//   // Seed database for this testing
//   /* User: {
//    fullname: 'jimoh hadi',
//    username: 'ovenje',
//    email: 'ovenje@yahoo.com',
//    mobile: '8163041269',
//    password: '11223344' }
//    */
//   before(seeder.addUserToDb);
//   it('Should return status code 400 and a message when input are invalid. i.e some empty fields', (done) => {
//     request(app)
//         .post('/api/user/signin')
//         .send(seeder.setLoginData('', '11223344'))
//         .expect(400)
//         .end((err, res) => {
//           if (err) return done(err);
//           assert.equal(res.body, 'There are problems with your input');
//           done();
//         });
//   });
//   it('Should return status code 404 and a message if User not found', (done) => {
//     request(app)
//         .post('/api/user/signin')
//         .send(seeder.setLoginData('jimoh', '11223344'))
//         .expect(404)
//         .end((err, res) => {
//           if (err) return done(err);
//           assert.equal(res.body, 'User not found');
//           done();
//         });
//   });
//   it('Should return status code 400 and a message when password is incorrect.', (done) => {
//     request(app)
//         .post('/api/user/signin')
//         .send(seeder.setLoginData('ovenje', '11223366'))
//         .expect(400)
//         .end((err, res) => {
//           if (err) return done(err);
//           assert.equal(res.body, 'Incorrect password');
//           done();
//         });
//   });
//   it('Should return 200 and give the user token if credentials are correct.', (done) => {
//     request(app)
//         .post('/api/user/signin')
//         .send(seeder.setLoginData('ovenje', '11223344'))
//         .expect(200)
//         .end((err, res) => {
//           if (err) return done(err);
//           assert.equal(res.body.message, 'Sign in successful');
//           assert.exists(res.body.token);
//           done();
//         });
//   });
// });
// describe('Get api/group/groupId/message', () => {
//   // Empty our database
//   before(seeder.emptyDB);
//   // Seed database for this testing
//   /* User: {
//    fullname: 'jimoh hadi',
//    username: 'ovenje',
//    email: 'ovenje@yahoo.com',
//    mobile: '8163041269',
//    password: '11223344' }
//    */
//   before(seeder.addUserToDb);
//   it('Should return status code 400 and a message when input are invalid. i.e some empty fields', (done) => {
//     request(app)
//         .post('/api/user/signin')
//         .send(seeder.setLoginData('', '11223344'))
//         .expect(400)
//         .end((err, res) => {
//           if (err) return done(err);
//           assert.equal(res.body, 'There are problems with your input');
//           done();
//         });
//   });
//   it('Should return status code 404 and a message if User not found', (done) => {
//     request(app)
//         .post('/api/user/signin')
//         .send(seeder.setLoginData('jimoh', '11223344'))
//         .expect(404)
//         .end((err, res) => {
//           if (err) return done(err);
//           assert.equal(res.body, 'User not found');
//           done();
//         });
//   });
//   it('Should return status code 400 and a message when password is incorrect.', (done) => {
//     request(app)
//         .post('/api/user/signin')
//         .send(seeder.setLoginData('ovenje', '11223366'))
//         .expect(400)
//         .end((err, res) => {
//           if (err) return done(err);
//           assert.equal(res.body, 'Incorrect password');
//           done();
//         });
//   });
//   it('Should return 200 and give the user token if credentials are correct.', (done) => {
//     request(app)
//         .post('/api/user/signin')
//         .send(seeder.setLoginData('ovenje', '11223344'))
//         .expect(200)
//         .end((err, res) => {
//           if (err) return done(err);
//           assert.equal(res.body.message, 'Sign in successful');
//           assert.exists(res.body.token);
//           done();
//         });
//   });
// });
