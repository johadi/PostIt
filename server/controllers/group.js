const User = require('../database/models').User;
const Group = require('../database/models').Group;
const UserGroup = require('../database/models').UserGroup;
const UserGroupAdd = require('../database/models').UserGroupAdd;
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
  groupAddUser(req, res) {
    // check to ensure is a logged in user and group id is provided
    if (!req.user || !req.params.groupId) {
      return res.status(400).send({ message: 'Oops! Something went wrong' });
    }
    // check to ensure detail of the user to add is provided
    if (!req.body.user) {
      return res.status(400).send({ message: 'Provide Valid user detail to add to group' });
    }
    /* let us check to ensure provided detail is a detail of a valid user.
    /* NOTE: The detail of a user can either be Username or Email or Mobile number
    */
    const user = req.body.user;
    const groupId = req.params.groupId;
    let foundUserId;
    User.findOne({
      where: {
        $or: [{ username: user }, { email: user }, { mobile: user }]
      }
    })
        .then((foundUser) => {
          if (!foundUser) {
            return res.status(404).send({ message: 'User not found' });
          }
          foundUserId = foundUser.id; // let us quickly get our user-to-add  ID for reuse
          return foundUser;
        })
        // Let us check again if this user has not been added to the group he's to be added to
        .then(foundUser => UserGroup.findOne({
          where: { groupId, userId: foundUser.id }
        }))
        .then((foundUserGroup) => {
          // If user is a member of this group. notify the person trying to add
          if (foundUserGroup) {
            return res.status(400).send({ message: 'user already belongs to group' });
          }
          // if user not a member of the group. time to add him to group and also update the user UserGroupAdd table
          // Add user to group
          const userGroup = UserGroup.create({ groupId, userId: foundUserId });
          // Add user to User-Group-Add table so we can know who added the user to the group he is just been added to
          const userGroupAdd = UserGroupAdd.create({ groupId, addedById: req.user.id, addedToId: foundUserId });
          return Promise.all([userGroup, userGroupAdd]); // resolve all and return values to next then()
        })
        .then((allResolved) => {
          // set data to send since all our promises have been resolved
          const data = {
            message: 'user added successfully',
            userGroup: allResolved[0],
            userGroupAdd: allResolved[1]
          };
          return res.status(200).send(data);
        })
        .catch(err => res.status(400).send(err));
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

