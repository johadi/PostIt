// groupSeeder.js
import models from './../../database/models';

export default {
  /**
   * Empty user Database
   * @function emptyUser
   * @param {function} done
   * @return {*} any
   */
  emptyUser(done) {
    models.User.destroy({ truncate: true })
        .then(() => done())
        .catch(err => done(err));
  },
  /**
   * Empty message Database
   * @function emptyMessage
   * @param {function} done
   * @return {*} any
   */
  emptyMessage(done) {
    models.Message.destroy({ truncate: true })
        .then(() => done())
        .catch(err => done(err));
  },
  /**
   * Empty group Database
   * @function emptyGroup
   * @param {function} done
   * @return {*} any
   */
  emptyGroup(done) {
    models.Group.destroy({ truncate: true })
        .then(() => done())
        .catch(err => done(err));
  },
  /**
   * Empty user-group Database
   * @function emptyUserGroup
   * @param {function} done
   * @return {*} any
   */
  emptyUserGroup(done) {
    models.UserGroup.destroy({ truncate: true })
        .then(() => done())
        .catch(err => done(err));
  },
  /**
   * Add user to Database function 1
   * @function addFirstUser
   * @param {function} done
   * @return {*} any
   */
  addFirstUser(done) {
    models.User.create({
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
   * Add user to Database function 2
   * @function addSecondUser
   * @param {function} done
   * @return {*} any
   */
  addSecondUser(done) {
    models.User.create({
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
   * Add user to Database function 3
   * @function addThirdUser
   * @param {function} done
   * @return {*} any
   */
  addThirdUser(done) {
    models.User.create({
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
   * Create Group Database function 1
   * @function createFirstGroup
   * @param {function} done
   * @return {*} any
   */
  createFirstGroup(done) {
    models.Group.create({
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
   * Create Group Database function 2
   * @function createSecondGroup
   * @param {function} done
   * @return {*} any
   */
  createSecondGroup(done) {
    models.Group.create({
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
   * Create Group Database function 3
   * @function createGroup3
   * @param {function} done
   * @return {*} any
   */
  createGroup3(done) {
    models.Group.create({
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
   * Add Message Database function 1
   * @function addFirstMessage
   * @param {function} done
   * @return {*} any
   */
  addFirstMessage(done) {
    models.Message.create({
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
   * Add Message Database function 2
   * @function addSecondMessage
   * @param {function} done
   * @return {*} any
   */
  addSecondMessage(done) {
    models.Message.create({
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
   * Add Message Database function 3
   * @function addThirdMessage
   * @param {function} done
   * @return {*} any
   */
  addThirdMessage(done) {
    models.Message.create({
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
   * @function addFirstUserGroup
   * @param {function} done
   * @return {*} any
   */
  addFirstUserGroup(done) {
    models.UserGroup.create({
      groupId: 100,
      userId: 10
    })
        .then((userToGroup) => {
          if (!userToGroup) {
            return Promise.reject('Error');
          }
          return models.UserGroupAdd.create({
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
   * @function addSecondUserGroup
   * @param {function} done
   * @return {*} any
   */
  addSecondUserGroup(done) {
    models.UserGroup.create({
      groupId: 99,
      userId: 5
    })
        .then((userToGroup) => {
          if (!userToGroup) {
            return Promise.reject('Error');
          }
          return models.UserGroupAdd.create({
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
   * @function addThirdUser
   * @param {function} done
   * @return {*} any
   */
  addThirdUserGroup(done) {
    models.UserGroup.create({
      groupId: 101,
      userId: 5
    })
        .then((userToGroup) => {
          if (!userToGroup) {
            return Promise.reject('Error');
          }
          return models.UserGroupAdd.create({
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
   * @function addFourthUserGroup
   * @param {function} done
   * @return {*} any
   */
  addFourthUserGroup(done) {
    models.UserGroup.create({
      groupId: 99,
      userId: 20
    })
        .then((userToGroup) => {
          if (!userToGroup) {
            return Promise.reject('Error');
          }
          return models.UserGroupAdd.create({
            addedById: 5,
            addedToId: 20,
            groupId: 99
          });
        })
        .then(() => done())
        .catch(err => done(err));
  },
  loginDetails: {
    username: 'johadi10',
    password: '11223344'
  },
  validUserDetails: {
    id: 5,
    fullname: 'jimoh hadi',
    username: 'johadi10',
    email: 'johadi10@yahoo.com',
    mobile: '81630412699'
  },
  newUserDetails: {
    username: 'sherif',
    password: '11223344'
  },
  firstGroupDetails: {
    id: 99,
    name: 'andela',
    creatorId: 1
  },
  firstUserDetails: {
    id: 20,
    username: 'oman',
    fullname: 'jack oman',
    email: 'oman@gmail.com'
  },
  secondUserDetails: {
    id: 30,
    username: 'sherif',
    fullname: 'muhammed sherif',
    email: 'sherif@gmail.com'
  }
};
