// authSeeder.js
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
   * Empty password recovery Database
   * @function emptyPasswordRecovery
   * @param {function} done
   * @return {*} any
   */
  emptyPasswordRecovery(done) {
    models.PasswordRecovery.destroy({ truncate: true })
      .then(() => done())
      .catch(err => done(err));
  },

  /**
   * Set user's data
   * @function setUserDetails
   * @param {string} fullname
   * @param {string} username
   * @param {string} email
   * @param {string} mobile
   * @param {string} password
   * @param {string} confirmPassword
   * @return {object} user's data
   */
  setUserDetails(fullname, username, email, mobile, password, confirmPassword) {
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
   * @function setLoginDetails
   * @param {string} username
   * @param {string} password
   * @return {object} login's data
   */
  setLoginDetails(username, password) {
    return { username, password };
  },

  /**
   * Add user to Database function 1
   * @function addUserToDB
   * @param {function} done
   * @return {*} any
   */
  addFirstUser(done) {
    models.User.create({
      id: 4,
      fullname: 'jimoh hadi',
      username: 'ovenje',
      email: 'ovenje@yahoo.com',
      mobile: '+2345905849589',
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
      id: 6,
      fullname: 'jimoh hadi',
      username: 'jimoh',
      email: 'jimoh@yahoo.com',
      mobile: '+2345905849504',
      password: '11223344' })
      .then(() => done())
      .catch(err => done(err));
  },

  userDetails: {
    username: 'johadi',
    fullname: 'jimoh hadi',
    email: 'jimoh@gmail.com',
    mobile: '+2345905849504',
    password: '11223344',
    confirmPassword: '11223344'
  },

  loginDetails: {
    username: 'ovenje',
    password: '11223344'
  }
};
