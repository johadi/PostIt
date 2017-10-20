import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from '../database/models';

dotenv.config();
const verifyRecoveryLink = (req, res, next) => {
  const token = req.query.token;
  if (!token) {
    return res.status(400).json('This link is Invalid');
  }
  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      return res.status(400).json('This link seems to have expired or invalid');
    }
    db.User.findById(decoded.id)
      .then((user) => {
        if (!user) {
          return Promise.reject('User with this recovery link doesn\'t ' +
            'match our record');
        }
        // check if you have a record of a user with this
        // token requesting password change
        return db.PasswordRecovery.findOne({ where: { hashed: token } });
      })
      .then((foundUser) => {
        if (!foundUser) {
          return Promise.reject('No record for this User requesting ' +
            'password change');
        }
        req.reset = decoded;
        return next();
      })
      .catch(err => res.status(404).json(err));
  });
};
export default verifyRecoveryLink;
