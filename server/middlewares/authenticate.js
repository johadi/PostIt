import jwt from 'jsonwebtoken';
import lodash from 'lodash';
import db from '../database/models';

require('dotenv').config();
// const jwt = require('jsonwebtoken');
// const lodash = require('lodash');
// const User = require('../database/models').User;

const authenticate = (req, res, next) => {
  const token = req.body.token || req.query.token || req.header('x-auth');
  if (!token) {
    return res.status(401).json('Unauthorized: No token provided');
  }
  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      return res.status(400).json('This token is invalid');
    }
    db.User.findById(decoded.id)
        .then((user) => {
          if (!user) {
            return Promise.reject('User with this token not found');
          }
          const userData = lodash.pick(user,
            ['id', 'username', 'email', 'mobile', 'fullname']
          );
          req.user = userData;
          return next();
        })
        .catch(err => res.status(404).json(err));
  });
};
export default authenticate;
