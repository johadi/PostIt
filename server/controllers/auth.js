import jwt from 'jsonwebtoken';
import lodash from 'lodash';
import Validator from 'validatorjs';
import bcrypt from 'bcrypt-nodejs';
import dotenv from 'dotenv';
import models from '../database/models';
import { sendMail, handleError, handleSuccess } from '../helpers/helpers';

dotenv.config();
export default {
  /**
   * Signup controller function
   * @function signup
   * @param {object} req - request parameter
   * @param {object} res - response parameter
   * @return {object} response detail
   */
  signup(req, res) {
    const body = req.body;
    const validator = new Validator(body, models.User.signupRules(),
      { regex:
        'The :attribute field must start with + followed by numbers of length 13'
      });
    validator.errors.first('mobile');
    if (validator.fails()) {
      return handleError({ code: 400,
        message: { validateError: validator.errors.all() } }, res);
    }
    if (body.confirmPassword !== body.password) {
      const errorMessage = { confirmPassword: 'passwords not matched'};
      return handleError({ code: 400, message: { validateError: errorMessage} }, res);
    }
    models.User.findOne({
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
          return Promise.reject({ code: 422, message });
        }
        // if user does not exist and he/she registering for the first time
        if (!req.body.mobile) {
          body.mobile = '';
        }
        body.username = body.username.toLowerCase();
        body.fullname = body.fullname.toLowerCase();
        body.email = body.email.toLowerCase();
        return models.User.create(
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
  /**
   * Signin controller function
   * @function signin
   * @param {object} req - request parameter
   * @param {object} res - response parameter
   * @return {object} response detail
   */
  signin(req, res) {
    const body = req.body;
    const validator = new Validator(body, models.User.loginRules());
    if (validator.fails()) {
      return handleError({ code: 400,
        message: { validateError: validator.errors.all() } }, res);
    }
    models.User.findOne({
      where: {
        username: body.username.toLowerCase()
      }
    })
        .then((user) => {
          if (!user) {
            return Promise.reject({ code: 404, message: 'User not found' });
          }
          if (!user.comparePassword(body.password)) {
            return Promise.reject({ code: 422, message: 'Incorrect password' });
          }
          // Give the user a token
          const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
          return handleSuccess(200, token, res);
        })
        .catch(err => handleError(err, res));
  },
  /**
   * password Recovery controller function
   * @function passwordRecovery
   * @param {object} req - request parameter
   * @param {object} res - response parameter
   * @return {object} response detail
   */
  passwordRecovery(req, res) {
    const recoveryRules = {
      email: 'required|email'
    };
    const validator = new Validator(req.body, recoveryRules);
    if (validator.fails()) {
      return handleError({ code: 400,
        message: { validateError: validator.errors.all() } }, res);
    }
    models.User.findOne({
      where: {
        email: req.body.email.toLowerCase()
      }
    })
      .then((user) => {
        if (!user) {
          return Promise.reject({ code: 404,
            message: 'Sorry! this email doesn\'t match our records' });
        }
        models.PasswordRecovery.findOne({ where: { email: user.email } })
          .then((foundUser) => {
            // If all is well
            const userDetails = lodash.pick(user, ['id', 'username', 'email']);
            // Create token and should expire in the next 24 hours
            const token = jwt.sign(userDetails,
              process.env.JWT_SECRET, { expiresIn: 3600 * 24 });
            // Handle our send email here
            const from = 'no-reply <jimoh@google.com>';
            const to = user.email;
            const link = process.env.NODE_ENV === 'production' ?
              `https://jimoh-postit.herokuapp.com/reset-password?token=${token}` :
              `http://localhost:8080/reset-password?token=${token}`;
            const subject = 'Your PostIt Password recovery link';
            const template = 'passwordRecovery';
            const context = {
              link,
              username: user.username
            };
            if (process.env.NODE_ENV !== 'test') {
              sendMail(from, to, subject, template, context)
                .then((sent) => {
                  if (!sent) {
                    return Promise.reject('Password recovery failed...try again');
                  }
                  // Do we have user data requesting for password change before?
                  // If yes ,just update his/her hash
                  if (foundUser) {
                    models.PasswordRecovery
                      .update({ hashed: token }, { where: { email: user.email } });
                  } else {
                    // Create a new log for the user, if no log before
                    models.PasswordRecovery.create({ email: user.email, hashed: token });
                  }
                  return handleSuccess(200,
                    'Password recovery link sent to your email', res);
                })
                .catch(() => {
                  // will automatically use error status code 500 in handleError()
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
  /**
   * Reset password controller function
   * @function resetPasswordPost
   * @param {object} req - request parameter
   * @param {object} res - response parameter
   * @return {object} response detail
   */
  resetPasswordPost(req, res) {
    const resetRules = {
      password: 'required|min:6',
      confirmPassword: 'required|min:6'
    };
    const validator = new Validator(req.body, resetRules);
    if (!validator.passes()) {
      return handleError({ code: 400,
        message: { validateError: validator.errors.all() } }, res);
    }
    if (req.body.password !== req.body.confirmPassword) {
      return handleError({ code: 422, message: 'Passwords not matched' }, res);
    }
    const userInfo = req.reset;
    models.User.findById(userInfo.id)
      .then((user) => {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        return user.update({ password: hash }, { where: { id: user.id } });
      })
      .then(() => handleSuccess(200, 'Password changed successfully', res))
      .catch(() => {
        // will automatically use error status code 500 in handleError()
        const errorMessage = 'Error occurred while processing your ' +
          'request. Try again';
        return handleError(errorMessage, res);
      });
  }
};

