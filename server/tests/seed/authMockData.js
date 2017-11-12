// authSeeder.js
export default {
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

  signup: {
    userDetails: {
      username: 'johadi',
      fullname: 'jimoh hadi',
      email: 'jimoh@gmail.com',
      mobile: '+2345905849504',
      password: '11223344',
      confirmPassword: '11223344'
    },
    newUserDetails: {
      newUsername: 'jamiu',
      newFullname: 'jamiu hadi',
      newEmail: 'jamiu@gmail.com',
      newMobile: '+2345905849504',
      newPassword: '11223344',
      newConfirmPassword: '11223344'
    },
    newPassword: '123456',
    newConfirmPassword: '11223344',
    existingUsername: 'ovenje',
    existingEmail: 'ovenje@yahoo.com',
    newUsername: 'johadi11',
    returnedPassword: { password: '11223344' },
    invalidUsername: ''
  },

  signin: {
    loginDetails: {
      username: 'ovenje',
      password: '11223344'
    },
    invalidUsername: '',
    notFoundUsername: 'jimoh',
    incorrectPassword: '11223366'
  },
  recoverPassword: {
    invalidEmail: 'xyz@gmail.com'
  }
};
