require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../database/models').User;

module.exports = (req, res, next) => {
  const token = req.body.token || req.query.token || req.header('x-auth');
  if (!token) {
    return res.status(401).json('Unauthorized: No token provided');
  }
  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      return res.status(400).json('This token is invalid');
    }
    User.findById(decoded.id)
        .then((user) => {
          if (!user) {
            return Promise.reject('User with this token not found');
          }
          req.user = decoded;
          return next();
        })
        .catch(err => res.status(404).json(err));
  });
};
