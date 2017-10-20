// auth_seed.js
import db from './../../database/models';

export default {
  emptyDB(done) {
    db.User.destroy({ truncate: true })
      .then(() => done())
      .catch(err => done(err));
  },
  emptyPasswordRecoveryDB(done) {
    db.PasswordRecovery.destroy({ truncate: true })
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
      confirmPassword
    };
  },
  setLoginData(username, password) {
    return { username, password };
  },
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
