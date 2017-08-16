require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../database/models').User;

module.exports = (req, res, next) => {
  const token = req.query.qrp;
  if (!token) {
    return res.status(400).json('This link is Invalid');
  }
  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      return res.status(400).json('This link seems to have expired or invalid');
    }
    User.findById(decoded.id)
      .then((user) => {
        if (!user) {
          return Promise.reject('User with this recovery link doesn\'t match our record');
        }
        req.reset = decoded;
        return next();
      })
      .catch(err => res.status(404).json(err));
  });
};
