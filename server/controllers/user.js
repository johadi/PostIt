import lodash from 'lodash';
import models from '../database/models';
import { handleError, handleSuccess } from '../helpers/helpers';
import { paginateResult, getPaginationMeta } from '../helpers/pagination';

export default {
  /**
   * Get the groups that user belongs to
   * @function getUserGroups
   * @param {object} req - request parameter
   * @param {object} res - response parameter
   * @return {object} response detail
   */
  getUserGroups(req, res) {
    if (req.user) {
      const userId = req.user.id;
      if (req.query.page && isNaN(parseInt(req.query.page, 10))) {
        return handleError({
          code: 400,
          message: 'Oops! Something went wrong, page query value must be a number'
        },
          res);
      }
      const { limit, offset } = paginateResult(req);
      models.UserGroup.findAndCountAll({
        where: { userId },
        limit,
        offset,
        include: [{ model: models.Group, attributes: ['id', 'name', 'creatorId'] }]
      })
        .then((result) => {
          const groupUsersDetails = {
            groups: result.rows,
            id: req.user.id,
            username: req.user.username,
            fullname: req.user.fullname,
            metaData: getPaginationMeta(result, offset, limit)
          };
          return handleSuccess(200, groupUsersDetails, res);
        })
        .catch(err => handleError(err, res));
    }
  },
  /**
   * Get all messages that are sent to groups a user
   * belongs to but those he/she has not read
   * @function userMessageBoard
   * @param {object} req - request parameter
   * @param {object} res - response parameter
   * @return {object} response detail
   */
  userMessageBoard(req, res) {
    if (req.user) {
      const userId = req.user.id;
      if (req.query.page && isNaN(parseInt(req.query.page, 10))) {
        return handleError({
          code: 400,
          message: 'This request is invalid.Request URL must have a query named ' +
          'page with number as value'
        }, res);
      }
      // Let us find all groupIds this user belongs to first
      models.UserGroup.findAll({ where: { userId }, attributes: ['groupId'] })
        .then((result) => {
          // We then convert the groupIds from array
          // of objects to plain arrays [23, 67, 89]
          const userGroupIds = result.map(userGroup => userGroup.groupId);
          return userGroupIds; // arrays of group Ids i.e [23,67,89]
        })
        .then((userGroupIds) => {
          // get all messages of a user in all groups
          // he/she joined (read and unread)
          const allUserGroupMessages = models.Message
            .findAndCountAll({ where: { groupId: userGroupIds } });
          return Promise.all([allUserGroupMessages, userGroupIds]);
        })
        .then((allResolvedPromise) => {
          // user messages in all groups
          const allUserGroupMessages = allResolvedPromise[0];
          const userGroupIds = allResolvedPromise[1]; // user groups Id
          const { limit, offset } = paginateResult(req);
          // get all unread messages of a user in all groups
          // he/she joined (Unread only). good for getting count of
          // all user unread messages in all his/her joined groups
          const userGroupUnreadMessages = allUserGroupMessages
            .rows.filter(message =>
              !(lodash.includes(message.readersId, userId)));
          // Fetch user unread messages using pagination information
          // like offset and limit. similar to the one above but this time,
          // we are fetching by pagination detail
          models.Message.findAll({
            // return messages that has groupIds like in [3,5,7,8,9]
            where: { groupId: userGroupIds },
            offset,
            limit,
            order: [['createdAt', 'DESC']],
            include: [{ model: models.User, attributes: ['username', 'fullname'] }, {
              model: models.Group,
              attributes: ['id', 'name']
            }]
          })
            .then((messages) => {
              // Get list of messages that have not been
              // read by a user with this limit and offset
              const filteredUnreadMessages = messages.filter(message =>
                !(lodash.includes(message.readersId, userId)));
              const userUnreadMessages = {
                count: userGroupUnreadMessages.length,
                rows: filteredUnreadMessages
              };
              const messageBoardDetails = {
                messages: userUnreadMessages.rows,
                metaData: getPaginationMeta(userUnreadMessages, offset, limit)
              };
              return handleSuccess(200, messageBoardDetails, res);
            })
            .catch(err => handleError(err, res));
        })
        .catch(err => handleError(err, res));
    }
  },
  /**
   * Get all users in the application by searched term.
   * You can also include array of user Ids in a group
   * @function getUsers
   * @param {object} req - request parameter
   * @param {object} res - response parameter
   * @return {object} response detail
   */
  getUsers(req, res) {
    if (req.user) {
      if (req.query.search) {
        const { limit, offset } = paginateResult(req);
        const searchedQuery = req.query.search.toLowerCase();
        const search = `%${searchedQuery}%`;
        models.User.findAndCountAll(
          {
            where: {
              $or: [{ username: { like: search } },
                { email: { like: search } }]
            },
            offset,
            limit,
            attributes: ['id', 'username', 'fullname', 'email'],
          })
          .then((users) => { // users = foundUsers
            // If a client wants to work with all
            // users in the application and all users of a certain group
            if (req.query.groupId) { // To get ids of Users in a group
              if (isNaN(parseInt(req.query.groupId, 10))) {
                return Promise.reject({
                  code: 400,
                  message: 'Query groupId must be a number'
                });
              }
              // get userId of all users in a particular
              // group by the given groupId as object
              const groupId = req.query.groupId;
              const userId = req.user.id;
              models.Group.findById(groupId)
                .then((group) => {
                  if (!group) {
                    return Promise.reject({ code: 404, message: 'Invalid group' });
                  }
                  // Check if User belongs to the group
                  return models.UserGroup.findOne({
                    where: { userId, groupId }
                  });
                })
                .then((foundUserAndGroup) => {
                  if (!foundUserAndGroup) {
                    return Promise.reject({
                      code: 403,
                      message: 'Invalid Operation: You don\'t belong to this group'
                    });
                  }
                  // get the userId of users that belongs to this group
                  return models.UserGroup.findAll({
                    where: { groupId: req.query.groupId },
                    attributes: ['userId']
                  });
                })
                .then((groupUsers) => {
                  // converts the array of userId objects to standard array of Ids
                  const groupUsersIdInArray = groupUsers
                    .map(groupUser => groupUser.userId);
                  const allUsersDetails = {
                    allUsers: users.rows,
                    groupUsersId: groupUsersIdInArray,
                    metaData: getPaginationMeta(users, offset, limit)
                  };
                  return handleSuccess(200, allUsersDetails, res);
                })
                .catch(err => handleError(err, res));
            } else {
              // If a client just want all users in the
              // application that match the searched term
              const userDetails = {
                users: users.rows,
                metaData: getPaginationMeta(users, offset, limit)
              };
              return handleSuccess(200, userDetails, res);
            }
          })
          .catch(err => handleError(err, res));
      } else {
        return handleError({
          code: 400,
          message: 'This request is invalid. Request URL must have a query named ' +
          'search with value'
        }, res);
      }
    }
  }
};
