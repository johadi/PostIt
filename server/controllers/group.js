const User = require('../database/models').User;
const Group = require('../database/models').Group;
const Message = require('../database/models').Message;

module.exports = {
  // Conreoller method for creating group
  createGroup(req, res) {
    if (req.user && req.user.id) {
      if (!req.body.name) {
        return res.status(400).send({ message: 'Group name required' });
      }
      const name = req.body.name.toLowerCase();// to save all group name in lowercase
      const creatorId = req.user.id;

      // let us check if group user wants to create already exist
      Group.findOne({
        where: { name }
      })
          .then((foundGroup) => {
            if (foundGroup) {
              return res.status(400).send({ message: 'This Group already exists' });
            }
            Group.create({// create group if it doesn't exist before
              name,
              creator_id: creatorId
            })
                .then((createdGroup) => {
                  if (createdGroup) {
                    return res.status(201).send(createdGroup);// send group details to creator for use
                  }
                  return res.status(400).send({ message: 'Group not created...Try again' });
                })
                .catch(err => res.status(400).send(err));
          })
          .catch(err => res.status(400).send(err));
    } else {
      // our middleware takes care of this action but let us still validate in case if middleware is bypassed
      return res.status(401).send({ message: 'oops! Something went wrong...Try again' });
    }
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

