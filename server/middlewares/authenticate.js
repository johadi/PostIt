require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.body.token || req.query.token || req.header('x-auth');
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        return res.status(400).json({ status: 400, error });
      }
      req.user = decoded;
      next();
    });
  } else {
    return res.status(404).json({ status: 404, message: 'Oops! Invalid Request...Try again' });
  }
};
