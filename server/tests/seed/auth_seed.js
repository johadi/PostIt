// auth_seed.js
import db from './../../database/models';

export default {
  /**
   * Empty user DB
   * @function emptyDB
   * @param {function} done
   * @return {*} any
   */
  emptyDB(done) {
    db.User.destroy({ truncate: true })
      .then(() => done())
      .catch(err => done(err));
  },
  /**
   * Empty password recovery DB
   * @function emptyPasswordRecoveryDB
   * @param {function} done
   * @return {*} any
   */
  emptyPasswordRecoveryDB(done) {
    db.PasswordRecovery.destroy({ truncate: true })
      .then(() => done())
      .catch(err => done(err));
  },
  /**
   * Set user's data
   * @function setData
   * @param {string} fullname
   * @param {string} username
   * @param {string} email
   * @param {string} mobile
   * @param {string} password
   * @param {string} confirmPassword
   * @return {object} user's data
   */
  setData(fullname, username, email, mobile, password, confirmPassword) {
    return {
      fullname,
      username,
      email,
      mobile,
      password,
      confirmPassword
    };
  },
  /**
   * Set login data
   * @function setLoginData
   * @param {string} username
   * @param {string} password
   * @return {object} login's data
   */
  setLoginData(username, password) {
    return { username, password };
  },
  /**
   * Add user to DB function 1
   * @function addUserToDB
   * @param {function} done
   * @return {*} any
   */
  addUserToDb(done) {
    db.User.create({
      id: 4,
      fullname: 'jimoh hadi',
      username: 'ovenje',
      email: 'ovenje@yahoo.com',
      mobile: '8163041269',
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
      id: 6,
      fullname: 'jimoh hadi',
      username: 'jimoh',
      email: 'jimoh@yahoo.com',
      mobile: '8163041269',
      password: '11223344' })
      .then(() => done())
      .catch(err => done(err));
  }
};
