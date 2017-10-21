// group_seed.js
import db from './../../database/models';

export default {
  /**
   * Empty user DB
   * @function emptyUserDB
   * @param {function} done
   * @return {*} any
   */
  emptyUserDB(done) {
    db.User.destroy({ truncate: true })
        .then(() => done())
        .catch(err => done(err));
  },
  /**
   * Empty message DB
   * @function emptyMessageDB
   * @param {function} done
   * @return {*} any
   */
  emptyMessageDB(done) {
    db.Message.destroy({ truncate: true })
        .then(() => done())
        .catch(err => done(err));
  },
  /**
   * Empty group DB
   * @function emptyGroupDB
   * @param {function} done
   * @return {*} any
   */
  emptyGroupDB(done) {
    db.Group.destroy({ truncate: true })
        .then(() => done())
        .catch(err => done(err));
  },
  /**
   * Empty user-group DB
   * @function emptyUserGroupDB
   * @param {function} done
   * @return {*} any
   */
  emptyUserGroupDB(done) {
    db.UserGroup.destroy({ truncate: true })
        .then(() => done())
        .catch(err => done(err));
  },
  /**
   * Add user to DB function 1
   * @function addUserToDb
   * @param {function} done
   * @return {*} any
   */
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
  /**
   * Add user to DB function 2
   * @function addUserToDb2
   * @param {function} done
   * @return {*} any
   */
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
  /**
   * Add user to DB function 3
   * @function addUserToDb3
   * @param {function} done
   * @return {*} any
   */
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
  /**
   * Create Group DB function 1
   * @function createGroup
   * @param {function} done
   * @return {*} any
   */
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
  /**
   * Create Group DB function 2
   * @function createGroup2
   * @param {function} done
   * @return {*} any
   */
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
  /**
   * Create Group DB function 3
   * @function createGroup3
   * @param {function} done
   * @return {*} any
   */
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
  /**
   * Add Message DB function 1
   * @function addMessageToDb
   * @param {function} done
   * @return {*} any
   */
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
  /**
   * Add Message DB function 2
   * @function addMessageToDb2
   * @param {function} done
   * @return {*} any
   */
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
  /**
   * Add Message DB function 3
   * @function addMessageToDb3
   * @param {function} done
   * @return {*} any
   */
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
  /**
   * Add User to group function 1
   * @function addUserToGroup
   * @param {function} done
   * @return {*} any
   */
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
  /**
   * Add User to group function 2
   * @function addUserToGroup2
   * @param {function} done
   * @return {*} any
   */
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
  /**
   * Add User to group function 3
   * @function addUserToGroup3
   * @param {function} done
   * @return {*} any
   */
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
  /**
   * Add User to group function 4
   * @function addUserToGroup4
   * @param {function} done
   * @return {*} any
   */
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

