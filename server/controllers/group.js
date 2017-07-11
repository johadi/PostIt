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
        handleError('Group name required', res);
      }
      const name = req.body.name.toLowerCase();// to save all group name in lowercase
      const creatorId = req.user.id;

      // let us check if group user wants to create already exist
      Group.findOne({
        where: { name }
      })
          .then((foundGroup) => {
            if (foundGroup) {
              return Promise.resolve('This Group already exists');
            }
            return Group.create({// create group if it doesn't exist before
              name,
              creator_id: creatorId
            });
          })
          .then((createdGroup) => {
            if (createdGroup) {
              // send group details to creator for use
              handleSuccess(201, createdGroup, res);
            }
            return Promise.reject('Group not created...Try again');
          })
          .catch(err => handleError(err, res));
    } else {
      // our middleware takes care of this action but
      // let us still validate in case if middleware is bypassed
      handleError({ code: 401, message: 'oops! Something went wrong...Try again' }, res);
    }
  },
  // Controller method for adding user to group
  groupAddUser(req, res) {
    // check to ensure is a logged in user and group id is provided
    if (!req.user || !req.params.groupId) {
      handleError('Oops! Something went wrong', res);
    }
    // check to ensure detail of the user to add is provided
    if (!req.body.user) {
      handleError('Provide Valid user detail to add to group', res);
    }
    // let us check if the user is trying to add him/her self as that is not possible
    if (req.body.user === req.user.username ||
        req.body.user === req.user.email ||
        req.body.user === req.user.mobile) {
      handleError('Invalid operation. You can not add yourself', res);
    }
    const user = req.body.user;
    const groupId = req.params.groupId;
    // let us check if groupId is a valid group id
    Group.findById(groupId)
        .then((group) => {
          if (!group) {
            return Promise.reject({ code: 404, message: 'Invalid group' });
          }
          return Promise.resolve();// resolve nothing and go on
        })
        /* let us check to ensure provided detail is a detail of a valid user.
         /* NOTE: The detail of a user can either be Username or Email or Mobile number
         */
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
        // Let us check again if this user has not been added to the group he's to be added to
        .then((foundUser) => {
          const userGroup = UserGroup.findOne({
            where: { groupId, userId: foundUser.id }
          });
          return Promise.all([userGroup, foundUser.id]);
        })
        .then((foundUserGroup) => {
          // If user is a member of this group. notify the person trying to add
          if (foundUserGroup[0]) {
            return Promise.reject('User already belongs to this group');
          }
          // if user not a member of the group. time to add him to group
          // and also update the UserGroupAdd table
          // Add user to group. foundUserGroup[1] = ID of user to add to the group
          const userGroup = UserGroup.create({ groupId, userId: foundUserGroup[1] });
          // Add user to User-Group-Add table so we can know who added the
          // user to the group he is just been added to
          const userGroupAdd = UserGroupAdd.create({
            groupId, addedById: req.user.id, addedToId: foundUserGroup[1]
          });
          // resolve all promises and return values to next then()
          return Promise.all([userGroup, userGroupAdd]);
        })
        .then((allResolved) => {
          // set data to be sent since all our promises have been resolved
          const data = {
            message: 'User added successfully',
            userGroup: allResolved[0],
            userGroupAdd: allResolved[1]
          };
          handleSuccess(201, data, res);
        })
        .catch(err => handleError(err, res));
  }
};

