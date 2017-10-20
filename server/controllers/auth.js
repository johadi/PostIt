import jwt from 'jsonwebtoken';
import lodash from 'lodash';
import Validator from 'validatorjs';
import bcrypt from 'bcrypt-nodejs';
import db from '../database/models';
import { sendMail, handleError, handleSuccess } from '../helpers/helpers';

require('dotenv').config();

export default {
  signup(req, res) {
    const body = req.body;
    const validator = new Validator(body, db.User.signupRules());
    if (validator.fails()) {
      return handleError({ validateError: validator.errors.all() }, res);
    }
    if (body.confirmPassword !== body.password) {
      return handleError('passwords not matched', res);
    }
    db.User.findOne({
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
        return db.User.create(
          body,
          { fields: ['email', 'password', 'username', 'mobile', 'fullname'] }
        );
      })
      .then((savedUser) => {
        const token = jwt.sign({ id: savedUser.id }, process.env.JWT_SECRET);
        return handleSuccess(201, token, res);
      })
      .catch(err => handleError(err, res));
  },
  signin(req, res) {
    const body = req.body;
    const validator = new Validator(body, db.User.loginRules());
    if (validator.fails()) {
      return handleError({ validateError: validator.errors.all() }, res);
    }
    db.User.findOne({
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
          // Give the user a token
          const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
          return handleSuccess(200, token, res);
        })
        .catch(err => handleError(err, res));
  },
  // password Recovery
  passwordRecovery(req, res) {
    const recoveryRules = {
      email: 'required|email'
    };
    const validator = new Validator(req.body, recoveryRules);
    if (validator.fails()) {
      return handleError({ validateError: validator.errors.all() }, res);
    }
    db.User.findOne({
      where: {
        email: req.body.email.toLowerCase()
      }
    })
      .then((user) => {
        if (!user) {
          return Promise.reject({ code: 404,
            message: 'Sorry! this email doesn\'t match our records' });
        }
        db.PasswordRecovery.findOne({ where: { email: user.email } })
          .then((foundUser) => {
            // If all is well
            const userData = lodash.pick(user, ['id', 'username', 'email']);
            // Create token and should expire in the next 24 hours
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
                    db.PasswordRecovery
                      .update({ hashed: token }, { where: { email: user.email } });
                  } else {
                    // Create a new log for the user, if no log before
                    db.PasswordRecovery.create({ email: user.email, hashed: token });
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
    const resetRules = {
      password: 'required|min:6',
      confirmPassword: 'required|min:6'
    };
    const validator = new Validator(req.body, resetRules);
    if (!validator.passes()) {
      return handleError({ validateError: validator.errors.all() }, res);
    }
    if (req.body.password !== req.body.confirmPassword) {
      return handleError('Passwords not matched', res);
    }
    const userInfo = req.reset;
    db.User.findById(userInfo.id)
      .then((user) => {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        return user.update({ password: hash }, { where: { id: user.id } });
      })
      .then(() => handleSuccess(200, 'Password changed successfully', res))
      .catch(() => {
        const errorMessage = 'Error occurred while processing your ' +
          'request. Try again';
        return handleError(errorMessage, res);
      });
  }
};

