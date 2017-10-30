import db from '../database/models';
import Constants from '../helpers/constants';
import { handleError, handleSuccess } from '../helpers/helpers';

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
        return handleError('Group name required', res);
      }
      if (req.body.name.trim().length > 254) {
        return handleError('Invalid group name. It must be at most 254 characters long', res);
      }
      // to save all groups name in lowercase
      const name = (req.body.name).toLowerCase();
      const creatorId = req.user.id;

      // Check if the group user wants to create already exists
      db.Group.findOne({
        where: { name }
      })
          .then((foundGroup) => {
            if (foundGroup) {
              return Promise.reject('This Group already exists');
            }
            // Create group if it doesn't exist before
            return db.Group.create({
              name,
              creatorId
            });
          })
          .then((createdGroup) => {
            // Send an error if it doesn't exist before
            if (!createdGroup) {
              return Promise.reject('Group not created...Try again');
            }
            // If created,
            // Automatically adds user to the group he/she created
            const userAndGroups = db.UserGroup.create({
              userId: creatorId,
              groupId: createdGroup.id
            });
            // Automatically Adds user to the Table that
            // indicates who adds another user to group
            // This is like User adds himself
            const userAddedBy = db.UserGroupAdd.create({
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
    } else {
      // our middleware takes care of this action but
      // let us still validate in case if middleware is bypassed
      return handleError({ code: 400,
        message: 'oops! Something went wrong...Try again' }, res);
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
      return handleError('Oops! Something went wrong, Check your route', res);
    }
    // check to ensure is a logged in user and group id is provided
    if (!req.user || !req.params.groupId) {
      return handleError('Oops! Something went wrong', res);
    }
    // check to ensure detail of the user to add is provided
    if (!req.body.user) {
      return handleError('Provide Valid user detail to add to group', res);
    }
    // let us check if the user is trying to add him/her
    // self as that is not possible
    const user = req.body.user;
    const groupId = req.params.groupId;
    // let us check if groupId is a valid group id
    db.Group.findById(groupId)
        .then((group) => {
          if (!group) {
            return Promise.reject({ code: 404, message: 'Invalid group' });
          }
          // Check if User that wants to add belongs to the group
          return db.UserGroup.findOne({
            where: { userId: req.user.id, groupId }
          });
        })
        .then((foundUserAndGroup) => {
          // If he doesn't belong to the group, reject him
          // from adding user unless he/she joined
          if (!foundUserAndGroup) {
            return Promise.reject('Invalid operation:' +
              ' you do not belong to this group');
          }
          // Reject a User trying to add himself
          if (req.body.user === req.user.username ||
            req.body.user === req.user.email) {
            return Promise.reject('You can\'t add yourself to group ' +
              'you already belong');
          }
          // Check to ensure provided detail is a detail of a valid user.
          // NOTE: The detail of a user can either be Username or Email
          return db.User.findOne({
            where: {
              $or: [{ username: user }, { email: user }]
            }
          });
        })
        .then((foundUser) => {
          if (!foundUser) {
            return Promise.reject({ code: 404, message: 'User not found' });
          }
          // Check again if this user has not been added to the group
          // he's to be added to
          const userGroup = db.UserGroup.findOne({
            where: { groupId, userId: foundUser.id }
          });
          return Promise.all([userGroup, foundUser]);
        })
        .then((foundUserAndGroup) => {
          // If User is a member of this group. notify the person trying
          // to add him/her
          if (foundUserAndGroup[0]) {
            return Promise.reject('User already belongs to this group');
          }
          // if user not a member of the group, time to add him/her to group
          // and also update the UserGroupAdd table
          // Add user to group.
          // foundUserGroupAndId[1] == ID of user to add to the group
          const userGroup = db.UserGroup.create({ groupId,
            userId: foundUserAndGroup[1].id });
          // Add user to User-Group-Add table so we can know who added the
          // user to the group he is just been added to
          const userGroupAdd = db.UserGroupAdd.create({
            groupId, addedById: req.user.id, addedToId: foundUserAndGroup[1].id
          });
          // Resolve all promises and return values to next then()
          return Promise.all([userGroup, userGroupAdd, foundUserAndGroup[1]]);
        })
        .then((allResolved) => {
          // set data to be sent since all our promises have been resolved
          const addToGroupData = {
            message: 'User added successfully',
            addedUser: allResolved[2].username,
            addedBy: req.user.username
          };
          return handleSuccess(201, addToGroupData, res);
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
      return handleError('Oops! Something went wrong, Check your route', res);
    }
    if (req.user && req.params.groupId) {
      const userId = req.user.id;
      const groupId = req.params.groupId;
      if (req.query.page && !isNaN(parseInt(req.query.page, 10))) {
        // convert the query to standard number for use
        const query = parseInt(req.query.page, 10);
        db.Group.findById(req.params.groupId)
            .then((group) => {
              if (!group) {
                return Promise.reject({ code: 404, message: 'invalid group' });
              }
              // Check if User belongs to the group
              const userGroup = db.UserGroup.findOne({
                where: { userId, groupId }
              }).then((foundUserGroup) => {
                if (!foundUserGroup) {
                  return Promise
                    .reject('Invalid Operation: You don\'t belong to this group');
                }
                return Promise.resolve(foundUserGroup);
              });
              return Promise.all([userGroup, group]);
            })
            .then((foundUserAndGroup) => {
              if (!foundUserAndGroup) {
                return Promise.reject('Invalid Operation: You don\'t belong ' +
                  'to this group');
              }
              // we got group info like this from our promise.all()
              const group = foundUserAndGroup[1];
              if (query === 0) { // get at most 6 users for side bar display
                db.UserGroup.findAndCountAll({
                  where: { groupId },
                  // limit: 6,
                  include: [{
                    model: db.User,
                    attributes: ['id', 'username', 'fullname']
                  }]
                })
                    .then((groupWithMembers) => {
                      const groupUsersData = {
                        id: group.id,
                        name: group.name,
                        users: groupWithMembers.rows,
                        count: groupWithMembers.count
                      };
                      return handleSuccess(200, groupUsersData, res);
                    })
                    .catch(err => handleError(err, res));
              } else {
                // Paginate result of group users
                // limit you want to display per page
                const perPage = Constants.GROUP_USERS_PER_PAGE;
                const currentPage = query < 1 ? 1 : query;
                const offset = perPage * (currentPage - 1); // items to skip
                db.UserGroup.findAndCountAll({
                  where: { groupId },
                  offset,
                  limit: perPage,
                  include: [{
                    model: db.User,
                    attributes: ['id', 'username', 'fullname']
                  }]
                })
                    .then((groupWithMembers) => {
                      if (!groupWithMembers) {
                        return Promise.reject('group not found');
                      }
                      // to round up i.e 3/2 = 1.5 = 2
                      const pages = Math.ceil(groupWithMembers.count / perPage);
                      const groupUsersData = {
                        id: group.id,
                        name: group.name,
                        pages,
                        users: groupWithMembers.rows,
                        count: groupWithMembers.count
                      };
                      return handleSuccess(200, groupUsersData, res);
                    })
                    .catch(err => handleError(err, res));
              } // end of the else of if (query==0)
            })
            .catch(err => handleError(err, res));
      } else {
        return handleError('Oops! Error. Request url' +
          ' must have query string named page with number as value', res);
      }
    }
  }
};

