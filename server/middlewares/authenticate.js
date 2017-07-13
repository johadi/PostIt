require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.body.token || req.query.token || req.header('x-auth');
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(400).send(err);
      }
      req.user = decoded;
      next();
    });
  } else {
    return res.status(401).send({ message: 'Unauthorized access: Provided a token' });
  }
};
