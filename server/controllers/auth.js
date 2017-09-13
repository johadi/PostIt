require('dotenv').config();
const User = require('../database/models').User;
const jwt = require('jsonwebtoken');
const lodash = require('lodash');
const Validator = require('validatorjs');
const { handleError, handleSuccess } = require('../helpers/helpers');

module.exports = {
  signup(req, res) {
    const body = req.body;
    const validator = new Validator(body, User.signupRules());
    if (validator.fails()) {
      return handleError({ validateError: validator.errors.all() }, res);
    }
    if (body.confirmPassword !== body.password) {
      return handleError('passwords not matched', res);
    }
    User.findOne({
      where: {
        $or: [{ email: body.email }, { username: body.username }]
      }
    })
      .then((existingUser) => {
        if (existingUser) {
          let message = '';
          if (existingUser.email === body.email) {
            message = 'A user with this email already exists';
          }
          if (existingUser.username === body.username) {
            message = 'This Username has been used';
          }
          return Promise.reject(message);
        }
        // if user does not exist and he/she registering for the first time
        if (!req.body.mobile) {
          body.mobile = '';
        }
        body.username = body.username.toLowerCase();
        body.fullname = body.fullname.toLowerCase();
        body.email = body.email.toLowerCase();
        return User.create(
          body,
          { fields: ['email', 'password', 'username', 'mobile', 'fullname'] }
        );
      })
      .then((savedUser) => {
        const signupData = lodash.pick(savedUser,
          ['id', 'username', 'email', 'mobile', 'fullname']
        );
        const token = jwt.sign(signupData, process.env.JWT_SECRET);
        return handleSuccess(201, token, res);
      })
      .catch(err => handleError(err, res));
  },
  signin(req, res) {
    const body = req.body;
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
          const signinData = lodash.pick(user, ['id', 'username', 'email', 'fullname']);
          // Give the user token and should expire in the next 24 hours
          const token = jwt.sign(signinData, process.env.JWT_SECRET);
          return handleSuccess(200, token, res);
        })
        .catch(err => handleError(err, res));
  }
};

