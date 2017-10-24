import lodash from 'lodash';
import db from '../database/models';
import Constants from '../helpers/constants';
import { handleError, handleSuccess } from '../helpers/helpers';

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
      if (req.query.page) {
        if (isNaN(parseInt(req.query.page, 10))) {
          return handleError('Oops! Something went wrong, page query ' +
            'value must be a number', res);
        }
        // convert the query to standard number for use
        const query = parseInt(req.query.page, 10);
        // Return groups of at most 6 . this is good for client group side bar
        if (query === 0) {
          db.UserGroup.findAndCountAll({
            where: { userId },
            include: [{ model: db.Group, attributes: ['id', 'name', 'creatorId'] }]
          })
            .then((result) => {
              const userGroupsData = {
                groups: result.rows,
                count: result.count,
                id: req.user.id,
                username: req.user.username,
                fullname: req.user.fullname
              };
              return handleSuccess(200, userGroupsData, res);
            })
            .catch(err => handleError(err, res));
        } else {
          // Return result as it supposed to be.
          // limit you want to display per page
          const perPage = Constants.USER_GROUPS_PER_PAGE;
          const currentPage = query < 1 ? 1 : query;
          // i.e page2 items=9*(2-1) =9*1= 9 items
          // will be skipped. page2 items displays from item 10
          const offset = perPage * (currentPage - 1);
          // const nextPage = parseInt(currentPage, 10) + 1;
          db.UserGroup.findAndCountAll({
            where: { userId },
            limit: perPage,
            offset,
            include: [{ model: db.Group, attributes: ['id', 'name', 'creatorId'] }]
          })
            .then((result) => {
              // round off i.e 3/2 = 1.5 = 2
              const pages = Math.ceil(result.count / perPage);
              const groupUsersData = {
                groups: result.rows,
                count: result.count,
                pages,
                id: req.user.id,
                username: req.user.username,
                fullname: req.user.fullname
              };
              return handleSuccess(200, groupUsersData, res);
            })
            .catch(err => handleError(err, res));
        }
      } else {
        return handleError('Oops! Error. Request url must have ' +
          'query string named page with number as value', res);
      }
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
      if (req.query.page && !isNaN(parseInt(req.query.page, 10))) {
        // Let us find all groupIds this user belongs to first
        db.UserGroup.findAll({ where: { userId }, attributes: ['groupId'] })
          .then((result) => {
            // We then convert the groupIds from array
            // of objects to plain arrays [23, 67, 89]
            const userGroupIds = result.map(userGroup => userGroup.groupId);
            return userGroupIds; // arrays of group Ids i.e [23,67,89]
          })
          .then((userGroupIds) => {
            // get all messages of a user in all groups
            // he/she joined (read and unread)
            const allUserGroupMessages = db.Message
              .findAndCountAll({ where: { groupId: userGroupIds } });
            return Promise.all([allUserGroupMessages, userGroupIds]);
          })
          .then((allResolvedPromise) => {
            // user messages in all groups
            const allUserGroupMessages = allResolvedPromise[0];
            const userGroupIds = allResolvedPromise[1]; // user groups Id
            // convert the query to standard number for use
            const query = parseInt(req.query.page, 10);
            // limit you want to display per page
            const perPage = Constants.BOARD_MESSAGES_PER_PAGE;
            const currentPage = query < 1 ? 1 : query;
            const offset = perPage * (currentPage - 1);
            // get all unread messages of a user in all groups
            // he/she joined (Unread only). good for getting count of
            // all user unread messages in all his/her joined groups
            const userGroupUnreadMessages = allUserGroupMessages
              .rows.filter(message =>
                !(lodash.includes(message.readersId, userId)));
            // pages the unread messages in all joined groups formed
            // to round off i.e 3/2 = 1.5 = 2
            const pages = Math.ceil(userGroupUnreadMessages.length / perPage);
            // Fetch user unread messages using pagination information
            // like offset and limit. similar to the one above but this time,
            // we are fetching by pagination detail
            db.Message.findAll({
              // return messages that has groupIds like in [3,5,7,8,9]
              where: { groupId: userGroupIds },
              offset,
              limit: perPage,
              order: [['createdAt', 'DESC']],
              include: [{ model: db.User, attributes: ['username', 'fullname'] }, {
                model: db.Group,
                attributes: ['id', 'name']
              }]
            })
              .then((messages) => {
                // Get list of messages that have not been
                // read by a user with this limit and offset
                const userUnreadMessages = messages.filter(message =>
                  !(lodash.includes(message.readersId, userId)));
                const messageBoardData = {
                  // paginated messages obtained using offset
                  // and limit i.e (4 messages)
                  messages: userUnreadMessages,
                  // count of all messages users have not read (i.e 15)
                  count: userGroupUnreadMessages.length,
                  pages
                };
                return handleSuccess(200, messageBoardData, res);
              })
              .catch(err => handleError(err, res));
          })
          .catch(err => handleError(err, res));
      } else {
        return handleError('This request is invalid.' +
          'Request URL must have a query named page with number as value', res);
      }
    }
  },
  /**
   * Get all users in the application by searched term.
   * You can also include array of user Ids in a group
   * @function getSearchedUsers
   * @param {object} req - request parameter
   * @param {object} res - response parameter
   * @return {object} response detail
   */
  getSearchedUsers(req, res) {
    if (req.user) {
      if (req.query.search) {
        // Find all users in the application
        // convert the query to standard number for use
        // Let the page query default to one if user never passes page query
        const pageQuery = parseInt(req.query.page, 10) || 1;
        // limit you want to display per page
        const perPage = Constants.SEARCHED_RESULT_PER_PAGE;
        const currentPage = pageQuery < 1 ? 1 : pageQuery;
        const offset = perPage * (currentPage - 1);
        const searchedQuery = req.query.search.toLowerCase();
        const search = `%${searchedQuery}%`;
        db.User.findAndCountAll(
          {
            where: { $or: [{ username: { like: search } },
              { email: { like: search } }] },
            offset,
            limit: perPage,
            attributes: ['id', 'username', 'fullname', 'email'],
          })
          .then((users) => { // users = foundUsers
            // If a client wants to work with all
            // users in the application and all users of a certain group
            if (req.query.groupId) { // To get ids of Users in a group
              if (isNaN(parseInt(req.query.groupId, 10))) {
                return Promise.reject('Query groupId must be a number');
              }
              // get userId of all users in a particular
              // group by the given groupId as object
              const groupId = req.query.groupId;
              const userId = req.user.id;
              db.Group.findById(groupId)
                .then((group) => {
                  if (!group) {
                    return Promise.reject({ code: 404, message: 'Invalid group' });
                  }
                  // Check if User belongs to the group
                  return db.UserGroup.findOne({
                    where: { userId, groupId }
                  });
                })
                .then((foundUserAndGroup) => {
                  if (!foundUserAndGroup) {
                    return Promise.reject('Invalid Operation: You don\'t belong ' +
                      'to this group');
                  }
                  // get the userId of users that belongs to this group
                  return db.UserGroup.findAll({
                    where: { groupId: req.query.groupId },
                    attributes: ['userId']
                  });
                })
                .then((groupUsers) => {
                  // pages - to round off i.e 3/2 = 1.5 = 2
                  const pages = Math.ceil(users.count / perPage);
                  // converts the array of userId objects to standard array of Ids
                  const groupUsersIdInArray = groupUsers
                    .map(groupUser => groupUser.userId);
                  const allUsersData = {
                    allUsers: users.rows,
                    pages,
                    count: users.count,
                    groupUsersId: groupUsersIdInArray
                  };
                  return handleSuccess(200, allUsersData, res);
                })
                .catch(err => handleError(err, res));
            } else {
              // If a client just want all users in the
              // application that match the searched term
              return handleSuccess(200, users, res);
            }
          })
          .catch(err => handleError(err, res));
      } else {
        return handleError('This request is invalid. Request URL must have a ' +
          'query named search with value', res);
      }
    }
  }
};
