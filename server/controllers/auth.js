require('dotenv').config();
const User = require('../database/models').User;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
const lodash = require('lodash');
const Validator = require('validatorjs');
const { handleError, handleSuccess, sendMail } = require('../helpers/helpers');

module.exports = {
  signup(req, res) {
    const obj = req.body;
    const validator = new Validator(obj, User.signupRules());
    if (validator.passes()) {
      if (obj.confirm_password !== obj.password) {
        return handleError('password not matched', res);
      }
      User.findOne({
        where: {
          $or: [{ email: obj.email }, { username: obj.username }]
        }
      })
          .then((existingUser) => {
            if (existingUser) {
              let message = '';
              if (existingUser.email === obj.email) message = 'A user with this email already exists';
              if (existingUser.username === obj.username) message = 'This Username has been used';
              return Promise.reject(message);
            }
            // if user does not exist and he/she registering for the first time
            if (!req.body.mobile) {
              obj.mobile = '';
            }
            obj.username = obj.username.toLowerCase();
            obj.fullname = obj.fullname.toLowerCase();
            obj.email = obj.email.toLowerCase();
            return User.create(obj, { fields: ['email', 'password', 'username', 'mobile', 'fullname'] });
          })
          .then((savedUser) => {
            const data = lodash.pick(savedUser, ['id', 'username', 'email', 'mobile', 'fullname']);
            const token = jwt.sign(data, process.env.JWT_SECRET);
            return handleSuccess(201, token, res);
          })
          .catch(err => handleError(err, res));
    } else if (validator.fails()) {
      return handleError({ validateError: validator.errors.all() }, res);
    } else {
      return handleError('There are Problems in your input', res);
    }
  },
  signin(req, res) {
    const body = lodash.pick(req.body, ['username', 'password']);
    const validator = new Validator(body, User.loginRules());
    if (validator.fails()) {
      return handleError({ validateError: validator.errors.all() }, res);
    }
    User.findOne({
      where: {
        username: body.username.toLowerCase()
      }
    })
        .then((user) => {
          if (!user) {
            return Promise.reject({ code: 404, message: 'User not found' });
          }
          if (!user.comparePassword(body.password)) {
            return Promise.reject('Incorrect password');
          }
          // If all is well
          const data = lodash.pick(user, ['id', 'username', 'email', 'fullname']);
          // Give the user token and should expire in the next 24 hours
          const token = jwt.sign(data, process.env.JWT_SECRET);
          return handleSuccess(200, token, res);
        })
        .catch(err => handleError(err, res));
  },
  // password Recovery
  passwordRecovery(req, res) {
    const body = lodash.pick(req.body, ['email']);
    const rules = {
      email: 'required|email'
    };
    const validator = new Validator(body, rules);
    if (validator.fails()) {
      return handleError({ validateError: validator.errors.all() }, res);
    }
    User.findOne({
      where: {
        email: body.email.toLowerCase()
      }
    })
      .then((user) => {
        if (!user) {
          return Promise.reject({ code: 404, message: 'Sorry! this email doesn\'t match our records' });
        }
        // If all is well
        const data = lodash.pick(user, ['id', 'username', 'email']);
        // Create token and should expire in the next 24 hou
        const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: 3600 * 24 });
        // We handle our send email here
        const from = 'no-reply <jimoh@google.com>';
        const to = user.email;
        const link = process.env.NODE_ENV === 'production' ?
          `https://jimoh-postit.herokuapp.com/reset-password?qrp=${token}` :
          `http://localhost:8080/reset-password?qrp=${token}`;
        const subject = 'Your PostIt Password recovery link';
        // const message = '<h2>Click the link below to recover your password</h2><p><a href="localhost:4000/change-password?qrp='+token+'">Recover password</a></p>';
        const message = `<h2>Click the link below to reset your password</h2><p><a href="${link}">Recover Password</a></p>`;
        sendMail(from, to, subject, message)
          .then((sent) => {
            if (!sent) {
              return Promise.reject('Password recovery failed...try again');
            }
            return handleSuccess(200, 'Password recovery link sent to your email', res);
          })
          .catch(err => handleError(err, res));
      })
      .catch(err => handleError(err, res));
  },
  resetPasswordGet(req, res) {
    if (!req.reset) {
      return handleError('This request is invalid', res);
    }
    return handleSuccess(200, 'You can reset password', res);
  },
  resetPasswordPost(req, res) {
    if (!req.reset) {
      return handleError('Invalid request', res);
    }
    const obj = lodash.pick(req.body, ['password', 'confirm_password']);
    const rules = {
      password: 'required',
      confirm_password: 'required'
    };
    const validator = new Validator(obj, rules);
    if (!validator.passes()) {
      return handleError({ validateError: validator.errors.all() }, res);
    }
    if (obj.password !== obj.confirm_password) {
      return handleError('Passwords not matched', res);
    }
    const userInfo = req.reset;
    User.findById(userInfo.id)
      .then((user) => {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(obj.password, salt);
        return user.update({ password: hash }, { where: { id: user.id } });
      })
      .then(updatedUser => handleSuccess(200, 'Password changed successfully', res))
      .catch(err => handleError(err, res));
  }
};

