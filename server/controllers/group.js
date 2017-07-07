const User = require('../database/models').User;
const Group = require('../database/models').Group;
const Message = require('../database/models').Message;

module.exports = {
  createGroup(req, res) {
    if (req.user) {
      return res.status(200).send(req.user);
    }
    return res.status(400).send({ message: 'oops! Something went qrong' });
    // User.findOne({
    //   where: { email: req.user.email }
    // })
    //     .then(user => res.status(200).send(user.printEmail()))
    //     .catch(err => res.status(400).send(err));
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

