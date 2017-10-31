// group.test.js
import dotenv from 'dotenv';
import request from 'supertest';
import { assert } from 'chai';
import app from '../../../app';
import seeder from '../seed/group_seed';
import models from '../../database/models';

dotenv.config();
describe('Group API test', () => {
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
          models.Group.findOne({
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
          assert.equal(res.body, 'Invalid request. Parameter groupId must be a number');
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
            assert.equal(res.body, 'Invalid request. Parameter groupId must be a number');
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
      models.User.destroy({ where: { username: 'sherif' } })
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
});
