require('dotenv').config();
const User = require('../database/models').User;
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const Validator = require('validatorjs');
const { handleError, handleSuccess } = require('../helpers/helpers');

module.exports = {
  signup(req, res) {
    // return res.json(req.body);
    // const token = jwt.sign(req.body, process.env.JWT_SECRET);
    // return handleSuccess(201, token, res);
    // return handleError('Username already exists', res);
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
            return User.create(obj, { fields: ['email', 'password', 'username', 'mobile', 'fullname'] });
          })
          .then((savedUser) => {
            const data = _.pick(savedUser, ['id', 'username', 'email', 'mobile', 'fullname']);
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
    const body = _.pick(req.body, ['username', 'password']);
    const validator = new Validator(body, User.loginRules());
    if (validator.fails()) {
      return handleError({ validateError: validator.errors.all() }, res);
    }
    User.findOne({
      where: {
        username: body.username
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
          const data = _.pick(user, ['id', 'username', 'email', 'fullname']);
          // Give the user token and should expire in the next 24 hours
          const token = jwt.sign(data, process.env.JWT_SECRET);
          return handleSuccess(200, token, res);
        })
        .catch(err => handleError(err, res));
  }
};

