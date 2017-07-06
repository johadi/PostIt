const User = require('../database/models').User;

module.exports = {
  index(req, res) {
    res.send('update here');
  },
  signup(req, res) {
    User.findById(1)
            .then(result => res.status(200).send(result))
            .catch(err => res.status(400).send(err));
  },
  signin(req, res) {
    User.create({ email: 'jim@g.com', password: '89300', username: 'jimoh', fullname: 'jimoh hadi', mobile: '909' })
            .then(user => res.status(201).send(user))
            .catch(err => res.status(400).send(err));
        // res.send('hello');
  }
};

