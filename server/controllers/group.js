import models from '../database/models';
import {Op} from 'sequelize';
import { handleError, handleSuccess } from '../helpers/helpers';
import { paginateResult, getPaginationMeta } from '../helpers/pagination';

export default {
  /**
   * Create group controller function
   * @function createGroup
   * @param {object} req - request parameter
   * @param {object} res - response parameter
   * @return {object} response detail
   */
  createGroup(req, res) {
    if (req.user && req.user.id) {
      if (!req.body.name) {
        return handleError({ code: 400, message: 'Group name required' }, res);
      }
      if (req.body.name.trim().length > 254) {
        return handleError({
          code: 422,
          message: 'Invalid group name. It must be at most 254 characters long'
        },
          res);
      }
      // to save all groups name in lowercase
      const name = (req.body.name).toLowerCase();
      const creatorId = req.user.id;

      // Check if the group user wants to create already exists
      models.Group.findOne({
        where: { name }
      })
        .then((foundGroup) => {
          if (foundGroup) {
            return Promise.reject({ code: 422, message: 'This Group already exists' });
          }
          // Create group if it doesn't exist before
          return models.Group.create({
            name,
            creatorId
          });
        })
        .then((createdGroup) => {
          // Send an error if it doesn't exist before
          if (!createdGroup) {
            // error code will be 500
            return Promise.reject('Group not created...Try again');
          }
          // If created,
          // Automatically adds user to the group he/she created
          const userAndGroups = models.UserGroup.create({
            userId: creatorId,
            groupId: createdGroup.id
          });
          // Automatically Adds user to the Table that
          // indicates who adds another user to group
          // This is like User adds himself
          const userAddedBy = models.UserGroupAdd.create({
            addedById: creatorId,
            addedToId: creatorId,
            groupId: createdGroup.id
          });
          // Resolve everything and pass some info to next then.
          return Promise.all([userAndGroups, userAddedBy, createdGroup]);
        })
        // Returns only information of the group
        // the user created if successful
        .then(allResolved => handleSuccess(201, allResolved[2], res))
        .catch(err => handleError(err, res));
    }
  },
  /**
   * Add user to group controller function
   * @function addUserToGroup
   * @param {object} req - request parameter
   * @param {object} res - response parameter
   * @return {object} response detail
   */
  addUserToGroup(req, res) {
    // Check to ensure groupId is not a String
    if (isNaN(parseInt(req.params.groupId, 10))) {
      return handleError({
        code: 400,
        message: 'Invalid request. Parameter groupId must be a number'
      },
        res);
    }
    // // check to ensure detail of the user to add is provided
    // if (!req.body.user) {
    //   return handleError({ code: 400,
    //     message: 'Provide Valid user detail to add to group' }, res);
    // }
    // let us check if the user is trying to add him/her
    // self as that is not possible
    const user = req.body.user ? req.body.user : null;
    const groupId = req.params.groupId;
    // let us check if groupId is a valid group id
    models.Group.findByPk(groupId)
      .then((group) => {
        if (!group) {
          return Promise.reject({ code: 404, message: 'Invalid group' });
        }
        // Check if User that wants to add belongs to the group
        return models.UserGroup.findOne({
          where: { userId: req.user.id, groupId }
        });
      })
      .then((foundUserAndGroup) => {
        // If he doesn't belong to the group, reject him
        // from adding user unless he/she joined
        if (!foundUserAndGroup) {
          return Promise.reject({
            code: 403,
            message: 'Invalid operation: you do not belong to this group'
          });
        }
        // check to ensure detail of the user to add is provided
        if (!req.body.user) {
          return Promise.reject({
            code: 400,
            message: 'Provide Valid user detail to add to group'
          });
        }
        // Reject a User trying to add himself
        if (req.body.user === req.user.username ||
          req.body.user === req.user.email) {
          return Promise.reject({
            code: 422,
            message: 'You can\'t add yourself to group you already belong'
          });
        }
        // Check to ensure provided detail is a detail of a valid user.
        // NOTE: The detail of a user can either be Username or Email
        return models.User.findOne({
          where: {
            [Op.or]: [{ username: user }, { email: user }]
          }
        });
      })
      .then((foundUser) => {
        if (!foundUser) {
          return Promise.reject({ code: 404, message: 'User not found' });
        }
        // Check again if this user has not been added to the group
        // he's to be added to
        const userGroup = models.UserGroup.findOne({
          where: { groupId, userId: foundUser.id }
        });
        return Promise.all([userGroup, foundUser]);
      })
      .then((foundUserAndGroup) => {
        // If User is a member of this group. notify the person trying
        // to add him/her
        if (foundUserAndGroup[0]) {
          return Promise.reject({
            code: 422,
            message: 'User already belongs to this group'
          });
        }
        // if user not a member of the group, time to add him/her to group
        // and also update the UserGroupAdd table
        // Add user to group.
        // foundUserGroupAndId[1] == ID of user to add to the group
        const userGroup = models.UserGroup.create({
          groupId,
          userId: foundUserAndGroup[1].id
        });
        // Add user to User-Group-Add table so we can know who added the
        // user to the group he is just been added to
        const userGroupAdd = models.UserGroupAdd.create({
          groupId, addedById: req.user.id, addedToId: foundUserAndGroup[1].id
        });
        // Resolve all promises and return values to next then()
        return Promise.all([userGroup, userGroupAdd, foundUserAndGroup[1]]);
      })
      .then((allResolved) => {
        // set details to be sent since all our promises have been resolved
        const addToGroupDetails = {
          message: 'User added successfully',
          addedUser: allResolved[2].username,
          addedBy: req.user.username
        };
        return handleSuccess(201, addToGroupDetails, res);
      })
      .catch(err => handleError(err, res));
  },
  /**
   * get group users controller function
   * @function getGroupUsers
   * @param {object} req - request parameter
   * @param {object} res - response parameter
   * @return {object} response detail
   */
  getGroupUsers(req, res) {
    if (isNaN(parseInt(req.params.groupId, 10))) {
      return handleError({
        code: 400,
        message: 'Invalid request. Parameter groupId must be a number'
      }, res);
    }
    if (req.user && req.params.groupId) {
      const userId = req.user.id;
      const groupId = req.params.groupId;
      if (req.query.page && isNaN(parseInt(req.query.page, 10))) {
        return handleError({
          code: 400,
          message: 'Oops! Error. Request url must have query string named ' +
          'page with number as value'
        }, res);
      }
      // convert the query to standard number for use
      models.Group.findByPk(req.params.groupId)
        .then((group) => {
          if (!group) {
            return Promise.reject({ code: 404, message: 'invalid group' });
          }
          // Check if User belongs to the group
          const userGroup = models.UserGroup.findOne({
            where: { userId, groupId }
          }).then((foundUserGroup) => {
            if (!foundUserGroup) {
              return Promise
                .reject({
                  code: 403,
                  message: 'Invalid Operation: You don\'t belong to this group'
                });
            }
            return Promise.resolve(foundUserGroup);
          });
          return Promise.all([userGroup, group]);
        })
        .then((foundUserAndGroup) => {
          if (!foundUserAndGroup) {
            return Promise.reject({
              code: 403,
              message: 'Invalid Operation: You don\'t belong to this group'
            });
          }
          // we got group info like this from our promise.all()
          const group = foundUserAndGroup[1];
          const { limit, offset } = paginateResult(req);
          models.UserGroup.findAndCountAll({
            where: { groupId },
            offset,
            limit,
            include: [{
              model: models.User,
              attributes: ['id', 'username', 'fullname', 'avatarPath']
            }]
          })
            .then((groupWithMembers) => {
              const groupUsersDetails = {
                id: group.id,
                name: group.name,
                users: groupWithMembers.rows,
                metaData: getPaginationMeta(groupWithMembers, offset, limit)
              };
              return handleSuccess(200, groupUsersDetails, res);
            })
            .catch(err => handleError(err, res));
        })
        .catch(err => handleError(err, res));
    }
  },
  /**
   * Get a group details controller function
   * @function getGroupDetails
   * @param {object} req - request parameter
   * @param {object} res - response parameter
   * @return {object} response detail
   */
  getGroupDetails(req, res) {
    if (isNaN(parseInt(req.params.groupId, 10))) {
      return handleError({ code: 400, message: 'Invalid request. Parameter groupId must be a number' }, res);
    }

    if (req.user && req.params.groupId) {
      const userId = req.user.id;
      const groupId = req.params.groupId;
      models.Group.findByPk(req.params.groupId)
        .then((group) => {
          if (!group) {
            return Promise.reject({ code: 404, message: 'invalid group' });
          }
          // Check if User belongs to the group
          return models.UserGroup.findOne({
            where: { userId, groupId }
          })
            .then(res => {
              if(res) {
                return Promise.resolve(group);
              }
              return Promise.reject({ code: 403, message: 'Hmm, Invalid Operation: You don\'t belong to this group' })
            })
        })
        .then(message => handleSuccess(200, message, res))
        .catch(err => handleError(err, res));
    }
  },
};

