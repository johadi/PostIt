const User = require('../database/models').User;
const Group = require('../database/models').Group;
const Message = require('../database/models').Message;

module.exports = {
  createGroup(req, res) {
    Message.create({ body: 'hello jim', userId: 2, groupId: 1 })
            .then(msg => res.status(201).send(msg))
            .catch(err => res.status(400).send(err));
        // res.send('hello');
  },
  addUser(req, res) {
    res.send('update here');
  },
  postMessage(req, res) {
    res.send('delete here');
  },
  getMessage(req, res) {
    res.send('delete here');
  }
};

