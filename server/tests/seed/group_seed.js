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
    User.destroy({ truncate: true })
        .then(() => done())
        .catch(err => done(err));
  },
  emptyUserGroupDB(done) {
    User.destroy({ truncate: true })
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
      name: 'Andela',
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
  addMessageToDb(done) {
    Message.create({
      body: 'Carry something more than a brain to Andela Bootcamp..lol',
      groupId: 1,
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
  addUserToGroup(done) {
    UserGroup.create({
      groupId: 1,
      userId: 1
    })
        .then((userToGroup) => {
          if (!userToGroup) {
            return Promise.reject('Error');
          }
          return UserGroupAdd.create({
            addedById: 2,
            addedToId: 1,
            groupId: 1
          });
        })
        .then(() => done())
        .catch(err => done(err));
  },
  addUserToDb(done) {
    User.create({
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

