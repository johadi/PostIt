const User = require('../database/models').User;
const Group = require('../database/models').Group;
const Message = require('../database/models').Message;

module.exports = {
  createGroup(req, res) {
    if (req.user) {
      return res.status(200).send(req.user);
    }
    return res.status(400).send({ message: 'oops! Something went qrong' });
  },
  addUser(req, res) {
    if (req.user) {
      return res.status(200).send(req.user);
    }
    return res.status(400).send({ message: 'oops! Something went qrong' });
  },
  postMessage(req, res) {
    if (req.user) {
      return res.status(200).send(req.user);
    }
    return res.status(400).send({ message: 'oops! Something went qrong' });
  },
  getMessage(req, res) {
    if (req.user) {
      return res.status(200).send(req.user);
    }
    return res.status(400).send({ message: 'oops! Something went qrong' });
  }
};

