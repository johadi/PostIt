// auth_seed.js
const User = require('./../../database/models').User;

module.exports = {
  emptyDB(done) {
    User.destroy({ truncate: true })
        .then(() => done())
        .catch(err => done(err));
  },
  setData(fullname, username, email, mobile, password, confirmPassword) {
    return {
      fullname,
      username,
      email,
      mobile,
      password,
      confirm_password: confirmPassword
    };
  },
  addUserToDb(done) {
    User.create({
      fullname: 'jimoh hadi',
      username: 'ovenje',
      email: 'ovenje@yahoo.com',
      mobile: '8163041269',
      password: '11223344' })
        .then((user) => {
          done();
        })
        .catch((err) => {
          done(err);
        });
  }
};
