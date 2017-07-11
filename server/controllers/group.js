const User = require('../database/models').User;
const Group = require('../database/models').Group;
const UserGroup = require('../database/models').UserGroup;
const UserGroupAdd = require('../database/models').UserGroupAdd;
const Message = require('../database/models').Message;
const { handleError, handleSuccess } = require('../helpers/helpers');

module.exports = {
  // Controller method for creating group
  createGroup(req, res) {
    if (req.user && req.user.id) {
      if (!req.body.name) {
        return handleError('Group name required', res);
      }
      const name = req.body.name.toLowerCase();// to save all group name in lowercase
      const creatorId = req.user.id;

      // Check if the group user wants to create already exists
      Group.findOne({
        where: { name }
      })
          .then((foundGroup) => {
            if (foundGroup) {
              return Promise.reject('This Group already exists');
            }
            // Create group if it doesn't exist before
            return Group.create({
              name,
              creator_id: creatorId
            });
          })
          .then((createdGroup) => {
            // Send an error if it doesn't exist before
            if (!createdGroup) {
              return Promise.reject('Group not created...Try again');
            }
            // If created,
            // Automatically adds user to the group he/she created
            const userAndGroups = UserGroup.create({
              userId: creatorId,
              groupId: createdGroup.id
            });
            // Automatically Adds user to the Table that indicates who adds another user to group
            // This is like User adds himself
            const userAddedBy = UserGroupAdd.create({
              addedById: creatorId,
              addedToId: creatorId,
              groupId: createdGroup.id
            });
            // Resolve everything and pass some info to next then.
            return Promise.all([userAndGroups, userAddedBy, createdGroup]);
          })
          // Returns only information of the group the user created if successful
          .then(allResolved => handleSuccess(201, allResolved[2], res))
          .catch(err => handleError(err, res));
    } else {
      // our middleware takes care of this action but
      // let us still validate in case if middleware is bypassed
      return handleError({ code: 401, message: 'oops! Something went wrong...Try again' }, res);
    }
  },
  // Controller method for adding user to group
  addUserToGroup(req, res) {
    // check to ensure is a logged in user and group id is provided
    if (!req.user || !req.params.groupId) {
      return handleError('Oops! Something went wrong', res);
    }
    // check to ensure detail of the user to add is provided
    if (!req.body.user) {
      return handleError('Provide Valid user detail to add to group', res);
    }
    // let us check if the user is trying to add him/her self as that is not possible
    if (req.body.user === req.user.username ||
        req.body.user === req.user.email ||
        req.body.user === req.user.mobile) {
      return handleError('Invalid operation. You can not add yourself', res);
    }
    const user = req.body.user;
    const groupId = req.params.groupId;
    // let us check if groupId is a valid group id
    Group.findById(groupId)
        .then((group) => {
          if (!group) {
            return Promise.reject({ code: 404, message: 'Invalid group' });
          }
          // All is well. Resolve nothing and go on
          return Promise.resolve();
        })
        // let us check to ensure provided detail is a detail of a valid user.
        // NOTE: The detail of a user can either be Username or Email or Mobile number
        .then(() => User.findOne({
          where: {
            $or: [{ username: user }, { email: user }, { mobile: user }]
          }
        }))
        .then((foundUser) => {
          if (!foundUser) {
            return Promise.reject({ code: 404, message: 'User not found' });
          }
          return foundUser;
        })
        // Check again if this user has not been added to the group he's to be added to
        .then((foundUser) => {
          const userGroup = UserGroup.findOne({
            where: { groupId, userId: foundUser.id }
          });
          return Promise.all([userGroup, foundUser.id]);
        })
        .then((foundUserGroupAndId) => {
          // If User is a member of this group. notify the person trying to add him/her
          if (foundUserGroupAndId[0]) {
            return Promise.reject('User already belongs to this group');
          }
          // if user not a member of the group, time to add him/her to group
          // and also update the UserGroupAdd table
          // Add user to group. foundUserGroupAndId[1] == ID of user to add to the group
          const userGroup = UserGroup.create({ groupId, userId: foundUserGroupAndId[1] });
          // Add user to User-Group-Add table so we can know who added the
          // user to the group he is just been added to
          const userGroupAdd = UserGroupAdd.create({
            groupId, addedById: req.user.id, addedToId: foundUserGroupAndId[1]
          });
          // Resolve all promises and return values to next then()
          return Promise.all([userGroup, userGroupAdd]);
        })
        .then((allResolved) => {
          // set data to be sent since all our promises have been resolved
          const data = {
            message: 'User added successfully',
            userGroup: allResolved[0],
            userGroupAdd: allResolved[1]
          };
          return handleSuccess(201, data, res);
        })
        .catch(err => handleError(err, res));
  },
  // Controller method that allows User post messages to created group
  postMessage(req, res) {
    if (req.user && req.params.groupId) {
      if (!req.body.message) {
        return handleError('Message body required', res);
      }
      const userId = req.user.id;
      const body = req.body.message;
      const groupId = req.params.groupId;
      // Check if groupId is a valid group id
      Group.findById(groupId)
          .then((group) => {
            if (!group) {
              return Promise.reject({ code: 404, message: 'Invalid group' });
            }
            // resolve nothing and go on
            return Promise.resolve();
          })
          // Create the message
          .then(() => Message.create({ userId, body, groupId }))
          .then((messageCreated) => {
            if (!messageCreated) {
              return Promise.reject({ code: 400, message: 'Problem creating message...Try again' });
            }
            return handleSuccess(201, 'Message created successfully', res);
          })
          .catch(err => handleError(err, res));
    } else {
      return handleError('Oops! Something went wrong');
    }
  },
  // Controller method that allow users retrieve messages from group
  getMessages(req, res) {
    if (req.user && req.params.groupId) {
      Group.findById(req.params.groupId)
          .then((group) => {
            if (!group) {
              return Promise.reject({ code: 404, message: 'invalid group' });
            }
            // User.find({
            //   where: { id: req.user.id },
            //   include: [{ model: Message, as: 'message' }]
            // })
            const criteria = [
              { userId: req.user.id },
              { groupId: req.params.groupId }
            ];
            return Message.findAndCountAll({ where: { $and: criteria } });
            // Another to get user messages . by using their model relation
            // User.find({
            //   where: { id: req.user.id, },
            //   include: [{ model: Message }]
            // })
          })
          .then((messages) => {
            if (messages.rows.length === 0) {
              return Promise.reject({ code: 404, message: 'User has no message in this group' });
            }
            return handleSuccess(200, messages, res);
          })
          .catch(err => handleError(err, res));
    } else {
      return handleError('oops! Something went qrong', res);
    }
  }
};

