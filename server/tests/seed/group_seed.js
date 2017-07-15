// group_seed.js
const User = require('./../../database/models').User;
const Group = require('./../../database/models').Group;
const UserGroup = require('./../../database/models').UserGroup;
const UserGroupAdd = require('./../../database/models').UserGroupAdd;
const Message = require('./../../database/models').Message;

module.exports = {
  emptyUserDB(done) {
    User.destroy({ truncate: true })
        .then(() => done())
        .catch(err => done(err));
  },
  emptyMessageDB(done) {
    Message.destroy({ truncate: true })
        .then(() => done())
        .catch(err => done(err));
  },
  emptyGroupDB(done) {
    Group.destroy({ truncate: true })
        .then(() => done())
        .catch(err => done(err));
  },
  emptyUserGroupDB(done) {
    UserGroup.destroy({ truncate: true })
        .then(() => done())
        .catch(err => done(err));
  },
  emptyUserGroupDBAdd(done) {
    UserGroupAdd.destroy({ truncate: true })
        .then(() => done())
        .catch(err => done(err));
  },
  setMessageData(messageBody, groupId, userId) {
    return {
      messageBody,
      groupId,
      userId
    };
  },
  createGroup(done) {
    Group.create({
      id: 99,
      name: 'andela',
      creator_id: 1
    })
        .then((group) => {
          if (!group) {
            return Promise.reject('Error');
          }
          return done();
        })
        .catch(err => done(err));
  },
  createGroup2(done) {
    Group.create({
      id: 100,
      name: 'react',
      creator_id: 7
    })
        .then((group) => {
          if (!group) {
            return Promise.reject('Error');
          }
          return done();
        })
        .catch(err => done(err));
  },
  createGroup4(done) {
    Group.create({
      id: 101,
      name: 'lord',
      creator_id: 7
    })
        .then((group) => {
          if (!group) {
            return Promise.reject('Error');
          }
          return done();
        })
        .catch(err => done(err));
  },
  addMessageToDb(done) {
    Message.create({
      body: 'Carry something more than a brain to Andela Bootcamp..lol',
      groupId: 100,
      userId: 1
    })
        .then((message) => {
          if (!message) {
            return Promise.reject('Error');
          }
          return done();
        })
        .catch(err => done(err));
  },
  addMessageToDb2(done) {
    Message.create({
      body: 'Carry something more than a brain to Andela Bootcamp..lol',
      groupId: 100,
      userId: 1
    })
        .then((message) => {
          if (!message) {
            return Promise.reject('Error');
          }
          return done();
        })
        .catch(err => done(err));
  },
  addMessageToDb3(done) {
    Message.create({
      body: 'Learners are leaders',
      groupId: 99,
      userId: 5
    })
        .then((message) => {
          if (!message) {
            return Promise.reject('Error');
          }
          return done();
        })
        .catch(err => done(err));
  },
  addUserToGroup(done) {
    UserGroup.create({
      groupId: 100,
      userId: 10
    })
        .then((userToGroup) => {
          if (!userToGroup) {
            return Promise.reject('Error');
          }
          return UserGroupAdd.create({
            addedById: 1,
            addedToId: 1,
            groupId: 1
          });
        })
        .then(() => done())
        .catch(err => done(err));
  },
  addUserToGroup2(done) {
    UserGroup.create({
      groupId: 99,
      userId: 5
    })
        .then((userToGroup) => {
          if (!userToGroup) {
            return Promise.reject('Error');
          }
          return UserGroupAdd.create({
            addedById: 5,
            addedToId: 5,
            groupId: 99
          });
        })
        .then(() => done())
        .catch(err => done(err));
  },
  addUserToGroup4(done) {
    UserGroup.create({
      groupId: 101,
      userId: 5
    })
        .then((userToGroup) => {
          if (!userToGroup) {
            return Promise.reject('Error');
          }
          return UserGroupAdd.create({
            addedById: 5,
            addedToId: 5,
            groupId: 101
          });
        })
        .then(() => done())
        .catch(err => done(err));
  },
  addUserToDb(done) {
    User.create({
      id: 5,
      fullname: 'jimoh hadi',
      username: 'johadi10',
      email: 'johadi10@yahoo.com',
      mobile: '81630412699',
      password: '11223344' })
        .then(user => done())
        .catch(err => done(err));
  },
  addUserToDb2(done) {
    User.create({
      fullname: 'Jack Oman',
      username: 'oman',
      email: 'oman@gmail.com',
      mobile: '08163041269',
      password: '11223344' })
        .then(user => done())
        .catch(err => done(err));
  }
};

