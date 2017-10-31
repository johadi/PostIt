import models from './../../database/models';

const modelSeed = {
  /**
   * Reset group DB
   * @function resetGroupDB
   * @param {object} groupData
   * @param {function} done
   * @return {*} any
   */
  resetGroupDb(groupData, done) {
    models.Group.destroy({ truncate: true })
      .then(() => models.Group.create(groupData))
      .then(() => done())
      .catch(error => done(error));
  },
  /**
   * Empty group DB
   * @function resetGroupDB
   * @param {function} done
   * @return {*} any
   */
  emptyGroupDb(done) {
    models.Group.destroy({ truncate: true })
      .then(() => done());
  },
  groupData: {
    name: 'fruits',
    creatorId: 3
  },
  groupInvalidData: {
    name: '',
    creatorId: 3
  },
  /**
   * Reset Message DB
   * @function resetMessageDB
   * @param {object} messageData
   * @param {function} done
   * @return {*} any
   */
  resetMessageDb(messageData, done) {
    models.Message.destroy({ truncate: true })
      .then(() => models.Message.create(messageData))
      .then(() => done())
      .catch(error => done(error));
  },
  /**
   * Empty Message DB
   * @function resetGroupDB
   * @param {function} done
   * @return {*} any
   */
  emptyMessageDb(done) {
    models.Message.destroy({ truncate: true })
      .then(() => done());
  },
  messageData: {
    body: 'How was your day?',
    userId: 3,
    groupId: 5,
    priority: 'normal',
    readersId: [3]
  },
  /**
   * Reset User DB
   * @function resetUserDB
   * @param {object} userData
   * @param {function} done
   * @return {*} any
   */
  resetUserDb(userData, done) {
    models.User.destroy({ truncate: true })
      .then(() => models.User.create(userData))
      .then(() => done())
      .catch(error => done(error));
  },
  /**
   * Empty User DB
   * @function resetUserDB
   * @param {function} done
   * @return {*} any
   */
  emptyUserDb(done) {
    models.User.destroy({ truncate: true })
      .then(() => done());
  },
  userData: {
    fullname: 'jimoh hady',
    username: 'johady',
    email: 'jimoh.hady@mail.com',
    password: '112233',
    mobile: '09065748390'
  },
  userNewData: {
    fullname: 'Jimoh Ali',
    username: 'ali',
    email: 'jimoh.ali@mail.com',
    password: '112233',
    mobile: '09065748390'
  },
  /**
   * Reset passwordRecovery DB
   * @function resetGroupDB
   * @param {object} passwordRecoveryData
   * @param {function} done
   * @return {*} any
   */
  resetPasswordRecoveryDb(passwordRecoveryData, done) {
    models.PasswordRecovery.destroy({ truncate: true })
      .then(() => models.PasswordRecovery.create(passwordRecoveryData))
      .then(() => done())
      .catch(error => done(error));
  },
  /**
   * Empty passwordRecovery DB
   * @function emptyPasswordRecoveryDB
   * @param {function} done
   * @return {*} any
   */
  emptyPasswordRecoveryDb(done) {
    models.PasswordRecovery.destroy({ truncate: true })
      .then(() => done());
  },
  passwordRecoveryData: {
    email: 'jim.hadi@gmail.com',
    hashed: 'xjsdjksjkdskdskdskdslkdsldsldlkslkdsjhdsjkdsjsdjkjkdsd'
  },
  longEmail: 'jkdfkldkdskldklskldskldskldskdshjdsiueuyieuhdhjsjusdisda' +
  'sopssdhvdshjsdhjshjdshjdshjsdhjdjhsdjhdsjhdsjkdskjjksdjkdskjdsbhefj' +
  'fhjjkdskjsdkdsklkdlskldskldsklsdkldsklkdlshdfjhjimoh@gmail.com',
  /**
   * Reset UserGroupAdd DB
   * @function resetUserAddDb
   * @param {object} addData
   * @param {function} done
   * @return {*} any
   */
  resetUserAddDb(addData, done) {
    models.UserGroupAdd.destroy({ truncate: true })
      .then(() => models.UserGroupAdd.create(addData))
      .then(() => done())
      .catch(error => done(error));
  },
  /**
   * Empty UserGroupAdd DB
   * @function emptyUserAddDb
   * @param {function} done
   * @return {*} any
   */
  emptyUserAddDb(done) {
    models.UserGroupAdd.destroy({ truncate: true })
      .then(() => done());
  },
  userAddData: {
    addedById: 4,
    addedToId: 6,
    groupId: 3
  }
};
export default modelSeed;
