import models from './../../database/models';

const modelSeed = {
  /**
   * Reset group Database
   * @function resetGroup
   * @param {object} groupDetails
   * @param {function} done
   * @return {*} any
   */
  resetGroup(groupDetails, done) {
    models.Group.destroy({ truncate: true })
      .then(() => models.Group.create(groupDetails))
      .then(() => done())
      .catch(error => done(error));
  },
  /**
   * Empty group Database
   * @function emptyGroup
   * @param {function} done
   * @return {*} any
   */
  emptyGroup(done) {
    models.Group.destroy({ truncate: true })
      .then(() => done());
  },
  groupDetails: {
    name: 'fruits',
    creatorId: 3
  },
  groupInvalidDetails: {
    name: '',
    creatorId: 3
  },
  /**
   * Reset Message Database
   * @function resetMessage
   * @param {object} messageDetails
   * @param {function} done
   * @return {*} any
   */
  resetMessage(messageDetails, done) {
    models.Message.destroy({ truncate: true })
      .then(() => models.Message.create(messageDetails))
      .then(() => done())
      .catch(error => done(error));
  },
  /**
   * Empty Message Database
   * @function emptyMessage
   * @param {function} done
   * @return {*} any
   */
  emptyMessage(done) {
    models.Message.destroy({ truncate: true })
      .then(() => done());
  },
  messageDetails: {
    body: 'How was your day?',
    userId: 3,
    groupId: 5,
    priority: 'normal',
    readersId: [3]
  },
  /**
   * Reset User Database
   * @function resetUser
   * @param {object} userDetails
   * @param {function} done
   * @return {*} any
   */
  resetUser(userDetails, done) {
    models.User.destroy({ truncate: true })
      .then(() => models.User.create(userDetails))
      .then(() => done())
      .catch(error => done(error));
  },
  /**
   * Empty User Database
   * @function emptyUser
   * @param {function} done
   * @return {*} any
   */
  emptyUser(done) {
    models.User.destroy({ truncate: true })
      .then(() => done());
  },
  userDetails: {
    fullname: 'jimoh hady',
    username: 'johady',
    email: 'jimoh.hady@mail.com',
    password: '112233',
    mobile: '09065748390'
  },
  newUserDetails: {
    fullname: 'Jimoh Ali',
    username: 'ali',
    email: 'jimoh.ali@mail.com',
    password: '112233',
    mobile: '09065748390'
  },
  /**
   * Reset passwordRecovery Database
   * @function resetresetPasswordRecovery
   * @param {object} passwordRecoveryDetails
   * @param {function} done
   * @return {*} any
   */
  resetPasswordRecovery(passwordRecoveryDetails, done) {
    models.PasswordRecovery.destroy({ truncate: true })
      .then(() => models.PasswordRecovery.create(passwordRecoveryDetails))
      .then(() => done())
      .catch(error => done(error));
  },
  /**
   * Empty passwordRecovery Database
   * @function emptyPasswordRecovery
   * @param {function} done
   * @return {*} any
   */
  emptyPasswordRecovery(done) {
    models.PasswordRecovery.destroy({ truncate: true })
      .then(() => done());
  },
  passwordRecoveryDetails: {
    email: 'jim.hadi@gmail.com',
    hashed: 'xjsdjksjkdskdskdskdslkdsldsldlkslkdsjhdsjkdsjsdjkjkdsd'
  },
  longEmail: 'jkdfkldkdskldklskldskldskldskdshjdsiueuyieuhdhjsjusdisda' +
  'sopssdhvdshjsdhjshjdshjdshjsdhjdjhsdjhdsjhdsjkdskjjksdjkdskjdsbhefj' +
  'fhjjkdskjsdkdsklkdlskldskldsklsdkldsklkdlshdfjhjimoh@gmail.com',
  /**
   * Reset UserGroupAdd Database
   * @function resetUserGroupAdd
   * @param {object} addUserGroupDetails
   * @param {function} done
   * @return {*} any
   */
  resetUserGroupAdd(addUserGroupDetails, done) {
    models.UserGroupAdd.destroy({ truncate: true })
      .then(() => models.UserGroupAdd.create(addUserGroupDetails))
      .then(() => done())
      .catch(error => done(error));
  },
  /**
   * Empty UserGroupAdd Database
   * @function emptyUserGroupAdd
   * @param {function} done
   * @return {*} any
   */
  emptyUserGroupAdd(done) {
    models.UserGroupAdd.destroy({ truncate: true })
      .then(() => done());
  },
  userGroupAddDetails: {
    addedById: 4,
    addedToId: 6,
    groupId: 3
  }
};
export default modelSeed;
