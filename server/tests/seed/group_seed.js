// group_seed.js
import db from './../../database/models';

export default {
  emptyUserDB(done) {
    db.User.destroy({ truncate: true })
        .then(() => done())
        .catch(err => done(err));
  },
  emptyMessageDB(done) {
    db.Message.destroy({ truncate: true })
        .then(() => done())
        .catch(err => done(err));
  },
  emptyGroupDB(done) {
    db.Group.destroy({ truncate: true })
        .then(() => done())
        .catch(err => done(err));
  },
  emptyUserGroupDB(done) {
    db.UserGroup.destroy({ truncate: true })
        .then(() => done())
        .catch(err => done(err));
  },
  emptyUserGroupDBAdd(done) {
    db.UserGroupAdd.destroy({ truncate: true })
        .then(() => done())
        .catch(err => done(err));
  },
  addUserToDb(done) {
    db.User.create({
      id: 5,
      fullname: 'jimoh hadi',
      username: 'johadi10',
      email: 'johadi10@yahoo.com',
      mobile: '81630412699',
      password: '11223344' })
        .then(() => done())
        .catch(err => done(err));
  },
  addUserToDb2(done) {
    db.User.create({
      id: 20,
      fullname: 'jack oman',
      username: 'oman',
      email: 'oman@gmail.com',
      mobile: '08163041269',
      password: '11223344' })
        .then(() => done())
        .catch(err => done(err));
  },
  addUserToDb3(done) {
    db.User.create({
      id: 30,
      fullname: 'muhammed sherif',
      username: 'sherif',
      email: 'sherif@gmail.com',
      mobile: '08163041269',
      password: '11223344' })
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
    db.Group.create({
      id: 99,
      name: 'andela',
      creatorId: 1
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
    db.Group.create({
      id: 100,
      name: 'react',
      creatorId: 7
    })
        .then((group) => {
          if (!group) {
            return Promise.reject('Error');
          }
          return done();
        })
        .catch(err => done(err));
  },
  createGroup3(done) {
    db.Group.create({
      id: 101,
      name: 'lord',
      creatorId: 7
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
    db.Message.create({
      id: 8,
      body: 'Carry something more than a brain to Andela Bootcamp..lol',
      groupId: 99,
      userId: 5
    })
        .then((message) => {
          if (!message) {
            return Promise.reject('Error');
          }
          message.readersId.push(5);
          message.update({
            readersId: message.readersId
          }, {
            where: { id: message.id }
          })
              .then(() => done())
              .catch(err => done(err));
        })
        .catch(err => done(err));
  },
  addMessageToDb2(done) {
    db.Message.create({
      id: 9,
      body: 'Carry something more than a brain to Andela Bootcamp..lol',
      groupId: 100,
      userId: 20
    })
        .then((message) => {
          if (!message) {
            return Promise.reject('Error');
          }
          message.readersId.push(20);
          message.update({
            readersId: message.readersId
          }, {
            where: { id: message.id }
          })
              .then(() => done())
              .catch(err => done(err));
        })
        .catch(err => done(err));
  },
  addMessageToDb3(done) {
    db.Message.create({
      id: 10,
      body: 'Learners are leaders',
      groupId: 99,
      userId: 5
    })
        .then((message) => {
          if (!message) {
            return Promise.reject('Error');
          }
          message.readersId.push(5);
          message.update({
            readersId: message.readersId
          }, {
            where: { id: message.id }
          })
              .then(() => done())
              .catch(err => done(err));
        })
        .catch(err => done(err));
  },
  addMessageToDb4(done) {
    db.Message.create({
      id: 13,
      body: 'No condition is permanent',
      groupId: 101,
      userId: 5
    })
        .then((message) => {
          if (!message) {
            return Promise.reject('Error');
          }
          message.readersId.push(5);
          message.update({
            readersId: message.readersId
          }, {
            where: { id: message.id }
          })
              .then(() => done())
              .catch(err => done(err));
        })
        .catch(err => done(err));
  },
  addUserToGroup(done) {
    db.UserGroup.create({
      groupId: 100,
      userId: 10
    })
        .then((userToGroup) => {
          if (!userToGroup) {
            return Promise.reject('Error');
          }
          return db.UserGroupAdd.create({
            addedById: 1,
            addedToId: 10,
            groupId: 100
          });
        })
        .then(() => done())
        .catch(err => done(err));
  },
  addUserToGroup2(done) {
    db.UserGroup.create({
      groupId: 99,
      userId: 5
    })
        .then((userToGroup) => {
          if (!userToGroup) {
            return Promise.reject('Error');
          }
          return db.UserGroupAdd.create({
            addedById: 5,
            addedToId: 5,
            groupId: 99
          });
        })
        .then(() => done())
        .catch(err => done(err));
  },
  addUserToGroup3(done) {
    db.UserGroup.create({
      groupId: 101,
      userId: 5
    })
        .then((userToGroup) => {
          if (!userToGroup) {
            return Promise.reject('Error');
          }
          return db.UserGroupAdd.create({
            addedById: 7,
            addedToId: 5,
            groupId: 101
          });
        })
        .then(() => done())
        .catch(err => done(err));
  },
  addUserToGroup4(done) {
    db.UserGroup.create({
      groupId: 99,
      userId: 20
    })
        .then((userToGroup) => {
          if (!userToGroup) {
            return Promise.reject('Error');
          }
          return db.UserGroupAdd.create({
            addedById: 5,
            addedToId: 20,
            groupId: 99
          });
        })
        .then(() => done())
        .catch(err => done(err));
  }
};

