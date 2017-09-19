require('dotenv').config();
const User = require('../database/models').User;
const PasswordRecovery = require('../database/models').PasswordRecovery;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
const lodash = require('lodash');
const Validator = require('validatorjs');
const { handleError, handleSuccess, sendMail } = require('../helpers/helpers');

module.exports = {
  // password Recovery
  passwordRecovery(req, res) {
    const rules = {
      email: 'required|email'
    };
    const validator = new Validator(req.body, rules);
    if (validator.fails()) {
      return handleError({ validateError: validator.errors.all() }, res);
    }
    User.findOne({
      where: {
        email: req.body.email.toLowerCase()
      }
    })
      .then((user) => {
        if (!user) {
          return Promise.reject({ code: 404,
            message: 'Sorry! this email doesn\'t match our records' });
        }
        PasswordRecovery.findOne({ where: { email: user.email } })
          .then((foundUser) => {
            // If all is well
            const userData = lodash.pick(user, ['id', 'username', 'email']);
            // Create token and should expire in the next 24 hou
            const token = jwt.sign(userData,
              process.env.JWT_SECRET, { expiresIn: 3600 * 24 });
            // Handle our send email here
            const from = 'no-reply <jimoh@google.com>';
            const to = user.email;
            const link = process.env.NODE_ENV === 'production' ?
              `https://jimoh-postit.herokuapp.com/reset-password?token=${token}` :
              `http://localhost:8080/reset-password?token=${token}`;
            const subject = 'Your PostIt Password recovery link';
            const message = `<h2>Click the link below to reset your PostIt password</h2>
                         <p><a href="${link}">Recover Password</a></p>`;
            if (process.env.NODE_ENV !== 'test') {
              sendMail(from, to, subject, message)
                .then((sent) => {
                  if (!sent) {
                    return Promise.reject('Password recovery failed...try again');
                  }
                  // Do we have user data requesting for password change before?
                  // If yes ,just update his/her hash
                  if (foundUser) {
                    PasswordRecovery.update({ hashed: token }, { where: { email: user.email } });
                  } else {
                    // Create a new log for the user, if no log before
                    PasswordRecovery.create({ email: user.email, hashed: token });
                  }
                  return handleSuccess(200,
                    'Password recovery link sent to your email', res);
                })
                .catch(() => {
                  const errorMessage = 'Error occurred while sending your ' +
                    'Password recovery link. Try again';
                  return handleError(errorMessage, res);
                });
            }
          })
          .catch(() => {
            const errorMessage = 'Error occurred while sending your Password ' +
              'recovery link. Try again';
            return handleError(errorMessage, res);
          });
      })
      .catch(err => handleError(err, res));
  },
  resetPasswordPost(req, res) {
    const rules = {
      password: 'required|min:6',
      confirmPassword: 'required|min:6'
    };
    const validator = new Validator(req.body, rules);
    if (!validator.passes()) {
      return handleError({ validateError: validator.errors.all() }, res);
    }
    if (req.body.password !== req.body.confirmPassword) {
      return handleError('Passwords not matched', res);
    }
    const userInfo = req.reset;
    User.findById(userInfo.id)
      .then((user) => {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        return user.update({ password: hash }, { where: { id: user.id } });
      })
      .then(() => handleSuccess(200, 'Password changed successfully', res))
      .catch(() => {
        const errorMessage = 'Error occurred while processing your request. Try again';
        return handleError(errorMessage, res);
      });
  }
};

