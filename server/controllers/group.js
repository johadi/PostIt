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
  }
};

