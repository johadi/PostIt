const _ = require('lodash');
const P = require('bluebird');
const User = require('../database/models').User;
const Group = require('../database/models').Group;
const UserGroup = require('../database/models').UserGroup;
const UserGroupAdd = require('../database/models').UserGroupAdd;
const Message = require('../database/models').Message;
const Constants = require('../helpers/constants');
const { sendSMS, sendMail, handleError, handleSuccess } = require('../helpers/helpers');

module.exports = {
  // Controller method for creating group
  createGroup(req, res) {
    if (req.user && req.user.id) {
      if (!req.body.name) {
        return handleError('Group name required', res);
      }
      const name = (req.body.name).toLowerCase();// to save all groups name in lowercase
      const creatorId = req.user.id;

      // Check if the
      // group user wants to create already exists
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
      return handleError({ code: 400, message: 'oops! Something went wrong...Try again' }, res);
    }
  },
  // Controller method for adding user to group
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
    // let us check if the user is trying to add him/her self as that is not possible
    const user = req.body.user;
    const groupId = req.params.groupId;
    // let us check if groupId is a valid group id
    Group.findById(groupId)
        .then((group) => {
          if (!group) {
            return Promise.reject({ code: 404, message: 'Invalid group' });
          }
          // Check if User that wants to add belongs to the group
          return UserGroup.findOne({
            where: { userId: req.user.id, groupId }
          });
        })
        .then((foundUserAndGroup) => {
          // If he doesn't belong to the group, reject him from adding user unless he/she joined
          if (!foundUserAndGroup) {
            return Promise.reject('Invalid operation: you do not belong to this group');
          }
          // Reject a User trying to add himself
          if (req.body.user === req.user.username || req.body.user === req.user.email) {
            return Promise.reject('You can\'t add yourself to group you already belong');
          }
          // Check to ensure provided detail is a detail of a valid user.
          // NOTE: The detail of a user can either be Username or Email
          return User.findOne({
            where: {
              $or: [{ username: user }, { email: user }]
            }
          });
        })
        .then((foundUser) => {
          if (!foundUser) {
            return Promise.reject({ code: 404, message: 'User not found' });
          }
          // Check again if this user has not been added to the group he's to be added to
          const userGroup = UserGroup.findOne({
            where: { groupId, userId: foundUser.id }
          });
          return Promise.all([userGroup, foundUser]);
        })
        .then((foundUserAndGroup) => {
          // If User is a member of this group. notify the person trying to add him/her
          if (foundUserAndGroup[0]) {
            return Promise.reject('User already belongs to this group');
          }
          // if user not a member of the group, time to add him/her to group
          // and also update the UserGroupAdd table
          // Add user to group. foundUserGroupAndId[1] == ID of user to add to the group
          const userGroup = UserGroup.create({ groupId, userId: foundUserAndGroup[1].id });
          // Add user to User-Group-Add table so we can know who added the
          // user to the group he is just been added to
          const userGroupAdd = UserGroupAdd.create({
            groupId, addedById: req.user.id, addedToId: foundUserAndGroup[1].id
          });
          // Resolve all promises and return values to next then()
          return Promise.all([userGroup, userGroupAdd, foundUserAndGroup[1]]);
        })
        .then((allResolved) => {
          // set data to be sent since all our promises have been resolved
          const data = {
            message: 'User added successfully',
            addedUser: allResolved[2].username,
            addedBy: req.user.username
          };
          return handleSuccess(201, data, res);
        })
        .catch(err => handleError(err, res));
  },
  // Controller method that allows User post messages to created group
  postMessage(req, res) {
    // Check to ensure groupId is not a String
    if (isNaN(parseInt(req.params.groupId, 10))) {
      return handleError('Oops! Something went wrong, Check your route', res);
    }
    if (req.user && req.params.groupId) {
      if (!req.body.message) {
        return handleError('Message body required', res);
      }
      let priority = 'normal';
      if (req.body.priority) {
        const priorities = ['normal', 'urgent', 'critical'];
        if (!(_.includes(priorities, req.body.priority.toLowerCase()))) {
          return handleError('Message priority level can only be normal or urgent or critical', res);
        }
        // make priority a lowercase letter
        priority = req.body.priority.toLowerCase();
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
          // Check if User belongs to this group
          .then(() => UserGroup.findOne({
            where: { userId, groupId }
          }))
          .then((foundUserAndGroup) => {
            if (!foundUserAndGroup) {
              return Promise.reject('Invalid Operation: You can\'t post to group You don\'t belong');
            }
            // Create Message if he belongs to this group
            return Message.create({ userId, body, priority, groupId });
          })
          .then((messageCreated) => {
            if (!messageCreated) {
              return Promise.reject({ code: 400, message: 'Problem creating message...Try again' });
            }
            // Since he is the sender let make him a person that has read the post
            // readersId keeps track of all users that have read the post. hence, we update it accordingly
            messageCreated.readersId.push(userId);
            return messageCreated.update({
              readersId: messageCreated.readersId
            }, {
              where: { id: messageCreated.id }
            });
          })
          .then((updatedMessage) => {
            // URGENT: Send only Email and In-app notification to group members
            if (updatedMessage.priority === 'urgent') {
              handleSuccess(201, 'Message created successfully', res);
              if (process.env.NODE_ENV !== 'test') {
                // get members of this group
                UserGroup.findAll({
                  where: { groupId: updatedMessage.groupId },
                  include: [{ model: User, attributes: ['email'] }]
                })
                  .then(groupAndMembers =>
                    // Using map of Bluebird promises (P)
                    // Bluebird map return array Promises values just like Promise.all()
                    P.map(groupAndMembers, groupAndMember => groupAndMember.User.email))
                  .then((groupMemberEmails) => {
                    // We handle our send email here
                    const from = 'no-reply <jimoh@google.com>';
                    const to = groupMemberEmails; // groupMemberEmails is an array of emails
                    const subject = 'Notification from PostIt';
                    const message = '<h2>Hi!, you have one notification from PostIt</h2>' +
                      '<h3>Notification level: Urgent</h3>' +
                      '<p><a href="https://jimoh-postit.herokuapp.com">Login to your PostIt account to view</a></p>' +
                      '<p>The PostIt management team!!!</p>';
                    sendMail(from, to, subject, message)
                      .then(() => console.log('Urgent message created successfully'))
                      // send successful whether error occurred or not since message was created
                      .catch(err => console.log(err));
                  })
                  .catch(err => console.log(err));
              }
              // CRITICAL: Send Email, SMS and In-app notification to group members
            } else if (updatedMessage.priority === 'critical') {
              handleSuccess(201, 'Message created successfully', res);
              if (process.env.NODE_ENV !== 'test') {
                // get members of this group
                UserGroup.findAll({
                  where: { groupId: updatedMessage.groupId },
                  include: [{ model: User, attributes: ['username', 'email', 'mobile'] }]
                })
                  .then(groupAndMembers =>
                    // Using map of Bluebird promises (P)
                    // Bluebird map return array of Promises values just like Promise.all()
                    P.map(groupAndMembers, (groupAndMember) => {
                      // We handle SMS here
                      const to = '+2347082015065';
                      const from = '+12568264564';
                      const smsBody = `Hi ${groupAndMember.User.username}, You have one notification from PostIt. you can login to view at https://jimoh-postit.herokuapp.com`;
                      sendSMS(from, to, smsBody);
                      // return email for use in sendMail
                      return groupAndMember.User.email;
                    }))
                  .then((groupMemberEmails) => {
                    // We handle our send email here
                    const from = 'no-reply <jimoh@google.com>';
                    const to = groupMemberEmails; // groupMemberEmails is an array of emails
                    const subject = 'Notification from PostIt';
                    const message = '<h2>Hi!, you have one notification from PostIt</h2>' +
                      '<h3>Notification level: Critical</h3>' +
                      '<p><a href="https://jimoh-postit.herokuapp.com">Login to your PostIt account to view</a></p>' +
                      '<p>The PostIt mangement team!!!</p>';
                    sendMail(from, to, subject, message)
                      .then(() => console.log('Critical message sent successfully'))
                      // send successful whether error occurred or not since message was created
                      .catch(err => console.log(err));
                  })
                  .catch(err => console.log(err));
              }
            } else {
              // NORMAL: Send only In-app notification
              return handleSuccess(201, 'Message created successfully', res);
            }
          })
          .catch(err => handleError(err, res));
    }
  },
  // Controller method that allow users retrieve messages from group
  getMessages(req, res) {
    if (isNaN(parseInt(req.params.groupId, 10))) {
      return handleError('Oops! Something went wrong, Check your route', res);
    }
    if (req.user && req.params.groupId) {
      const userId = req.user.id;
      const groupId = req.params.groupId;
      if (!req.query.page || isNaN(parseInt(req.query.page, 10))) {
        return handleError('This request is invalid. Request URL must contain query parameter named page with number as value', res);
      }
      const query = parseInt(req.query.page, 10);
      Group.findById(req.params.groupId)
          .then((group) => {
            if (!group) {
              return Promise.reject({ code: 404, message: 'invalid group' });
            }
            // to check if User belongs to the group
            return UserGroup.findOne({
              where: { userId, groupId }
            });
          })
          .then((foundUserAndGroup) => {
            if (!foundUserAndGroup) {
              return Promise.reject('Invalid Operation: You don\'t belong to this group');
            }
            // Let the user view messages if he/she belongs to the group
            const perPage = Constants.GET_MESSAGES_PER_PAGE; // = limit you want to display per page
            const currentPage = query < 1 ? 1 : query;
            const offset = perPage * (currentPage - 1); // items to skip
            return Message.findAndCountAll({
              where: { groupId },
              offset,
              limit: perPage,
              order: [['createdAt', 'DESC']],
              include: [{ model: User, attributes: ['id', 'username', 'fullname'] }]
            })
                .then((messages) => {
                  // to round up i.e 3/2 = 1.5 = 2
                  const pages = Math.ceil(messages.count / perPage);
                  const data = {
                    count: messages.count,
                    pages,
                    rows: messages.rows
                  };
                  return handleSuccess(200, data, res);
                })
                .catch(err => handleError(err, res));
          })
          .catch(err => handleError(err, res));
    }
  },
  // to view a particular message
  viewMessage(req, res) {
    if (isNaN(parseInt(req.params.groupId, 10)) || isNaN(parseInt(req.params.messageId, 10))) {
      return handleError('Oops! Something went wrong, Check your route', res);
    }
    if (req.user && req.params.groupId && req.params.messageId) {
      const userId = req.user.id;
      const groupId = req.params.groupId;
      const messageId = req.params.messageId;
      Group.findById(req.params.groupId)
          .then((group) => {
            if (!group) {
              return Promise.reject({ code: 404, message: 'invalid group' });
            }
            // Check if User belongs to the group
            return UserGroup.findOne({
              where: { userId, groupId }
            });
          })
          .then((foundUserAndGroup) => {
            if (!foundUserAndGroup) {
              return Promise.reject('Invalid Operation: You don\'t belong to this group');
            }
            // Let the user read the message he satisfies all the criteria
            return Message.findOne({
              where: { id: messageId, groupId },
              include: [{ model: User, attributes: ['id', 'username', 'fullname'] }]
            });
          })
          .then((message) => {
            if (!message) {
              return Promise.reject('message not found');
            }
            return handleSuccess(200, message, res);
          })
          .catch(err => handleError(err, res));
    }
  },
  // Controller that update the read message status of a user
  updateMessageReadStatus(req, res) {
    // Check to ensure groupId is not a String
    if (isNaN(parseInt(req.params.messageId, 10))) {
      return handleError('Oops! Something went wrong, Check your route', res);
    }
    if (req.user && req.params.messageId) {
      const userId = req.user.id;
      const messageId = req.params.messageId;
      // Check if groupId is a valid group id
      Message.findById(messageId)
          .then((message) => {
            if (!message) {
              return Promise.reject({ code: 404, message: 'Message with this ID doesn\'t exist' });
            }
            // Check if User belongs to the group
            UserGroup.findOne({
              where: { userId, groupId: message.groupId }
            })
                .then((foundUserAndGroup) => {
                  if (!foundUserAndGroup) {
                    return Promise.reject('You don\'t belong to this group');
                  }
                  // if all went well. update the readersId status
                  message.readersId.push(userId); // readersId is an array
                  return message.update({
                    readersId: message.readersId
                  }, {
                    where: { id: messageId }
                  });
                })
                .then(msg => handleSuccess(200, true, res))
                .catch(err => handleError(err, res));
          })
          .catch(err => handleError(err, res));
    }
  },
  // Get the list of all users that belong to a group
  getGroupUsers(req, res) {
    if (isNaN(parseInt(req.params.groupId, 10))) {
      return handleError('Oops! Something went wrong, Check your route', res);
    }
    if (req.user && req.params.groupId) {
      const userId = req.user.id;
      const groupId = req.params.groupId;
      if (req.query.page && !isNaN(parseInt(req.query.page, 10))) {
        const query = parseInt(req.query.page, 10); // convert the query to standard number for use
        Group.findById(req.params.groupId)
            .then((group) => {
              if (!group) {
                return Promise.reject({ code: 404, message: 'invalid group' });
              }
              // Check if User belongs to the group
              const userGroup = UserGroup.findOne({
                where: { userId, groupId }
              }).then((foundUserGroup) => {
                if (!foundUserGroup) {
                  return Promise.reject('Invalid Operation: You don\'t belong to this group');
                }
                return Promise.resolve(foundUserGroup);
              });
              return Promise.all([userGroup, group]);
            })
            .then((foundUserAndGroup) => {
              if (!foundUserAndGroup) {
                return Promise.reject('Invalid Operation: You don\'t belong to this group');
              }
              // we got group info like this from our promise.all()
              const group = foundUserAndGroup[1];
              if (query === 0) { // get at most 6 users for side bar display
                UserGroup.findAndCountAll({
                  where: { groupId },
                  // limit: 6,
                  include: [{
                    model: User,
                    attributes: ['id', 'username', 'fullname']
                  }]
                })
                    .then((groupWithMembers) => {
                      const data = {
                        id: group.id,
                        name: group.name,
                        Users: groupWithMembers.rows,
                        count: groupWithMembers.count
                      };
                      return handleSuccess(200, data, res);
                    })
                    .catch(err => handleError(err, res));
              } else { // Paginate result of group users
                const perPage = Constants.GET_GROUP_USERS_PER_PAGE; // = limit you want to display per page
                const currentPage = query < 1 ? 1 : query;
                const offset = perPage * (currentPage - 1); // items to skip
                UserGroup.findAndCountAll({
                  where: { groupId },
                  offset,
                  limit: perPage,
                  include: [{
                    model: User,
                    attributes: ['id', 'username', 'fullname']
                  }]
                })
                    .then((groupWithMembers) => {
                      if (!groupWithMembers) {
                        return Promise.reject('group not found');
                      }
                      const pages = Math.ceil(groupWithMembers.count / perPage); // to round up i.e 3/2 = 1.5 = 2
                      const data = {
                        id: group.id,
                        name: group.name,
                        pages,
                        Users: groupWithMembers.rows,
                        count: groupWithMembers.count
                      };
                      return handleSuccess(200, data, res);
                    })
                    .catch(err => handleError(err, res));
              } // end of the else of if (query==0)
            })
            .catch(err => handleError(err, res));
      } else {
        return handleError('Oops! Error. Request url must have query string named page with number as value', res);
      }
    }
  },
  // Get the list of all groups that a user belongs to
  getGroupsUserBelongsTo(req, res) {
    if (req.user) {
      const userId = req.user.id;
      if (req.query.page) {
        if (isNaN(parseInt(req.query.page, 10))) {
          return handleError('Oops! Something went wrong, page query value must be a number', res);
        }
        const query = parseInt(req.query.page, 10); // convert the query to standard number for use
        if (query === 0) { // Return groups of at most 6 . this is good for client group side bar
          UserGroup.findAndCountAll({
            where: { userId },
            // limit: 6,
            include: [{ model: Group, attributes: ['id', 'name', 'creator_id'] }]
          })
              .then((result) => {
                const data = {
                  Groups: result.rows,
                  count: result.count,
                  id: req.user.id,
                  username: req.user.username,
                  fullname: req.user.fullname
                };
                return handleSuccess(200, data, res);
              })
              .catch(err => handleError(err, res));
        } else { // Return result as it supposed to be.
          const perPage = Constants.GET_GROUPS_USER_BELONGS_TO_PER_PAGE; // = limit you want to display per page
          const currentPage = query < 1 ? 1 : query;
          const offset = perPage * (currentPage - 1); // i.e page2 items=9*(2-1) =9*1= 9 items will be skipped. page2 items displays from item 10
          // const previousPage = parseInt(currentPage, 10) - 1;
          // const nextPage = parseInt(currentPage, 10) + 1;
          UserGroup.findAndCountAll({
            where: { userId },
            limit: perPage,
            offset,
            include: [{ model: Group, attributes: ['id', 'name', 'creator_id'] }]
          })
              .then((result) => {
                const pages = Math.ceil(result.count / perPage); // to round off i.e 3/2 = 1.5 = 2
                // const hasPreviousPage = previousPage >= 1;
                // const hasNextPage = nextPage <= pages;
                const data = {
                  Groups: result.rows,
                  count: result.count,
                  pages,
                  // currentPage,
                  // nextPage,
                  // previousPage,
                  // hasNextPage,
                  // hasPreviousPage,
                  id: req.user.id,
                  username: req.user.username,
                  fullname: req.user.fullname
                };
                return handleSuccess(200, data, res);
              })
              .catch(err => handleError(err, res));
        }
      } else {
        return handleError('Oops! Error. Request url must have query string named page with number as value', res);
      }
    }
  },
  // Get all messages that are sent to groups a user belongs to but those he/she has not read
  userMessageBoard(req, res) {
    if (req.user) {
      const userId = req.user.id;
      if (req.query.page && !isNaN(parseInt(req.query.page, 10))) {
        // Let us find all groupIds this user belongs to first
        UserGroup.findAll({ where: { userId }, attributes: ['groupId'] })
            .then((result) => {
              // We then convert the groupIds from array of object to plain arrays [23, 67, 89]
              const userGroupIds = result.map(userGroup => userGroup.groupId);
              return userGroupIds; // arrays of group Ids i.e [23,67,89]
            })
            .then((userGroupIds) => {
              // get all messages of a user in all groups he/she joined (read and unread)
              const allUserGroupMessages = Message.findAndCountAll({ where: { groupId: userGroupIds } });
              return Promise.all([allUserGroupMessages, userGroupIds]);
            })
            .then((allResolvedPromise) => {
              const allUserGroupMessages = allResolvedPromise[0]; // user messages in all groups
              const userGroupIds = allResolvedPromise[1]; // user groups Id
              const query = parseInt(req.query.page, 10); // convert the query to standard number for use
              const perPage = Constants.USER_MESSAGE_BOARD_PER_PAGE; // = limit you want to display per page
              const currentPage = query < 1 ? 1 : query;
              const offset = perPage * (currentPage - 1);
              // get all unread messages of a user in all groups he/she joined (Unread only)
              const userGroupUnreadMessages = allUserGroupMessages.rows.filter(message =>
                !(_.includes(message.readersId, userId)));
              // pages the unread messages formed
              const pages = Math.ceil(userGroupUnreadMessages.length / perPage); // to round off i.e 3/2 = 1.5 = 2
              // Fetch user unread messages using pagination info like offset and limit
              Message.findAll({
                where: { groupId: userGroupIds }, // return messages that has groupIds like in [3,5,7,8,9]
                offset,
                limit: perPage,
                order: [['createdAt', 'DESC']],
                include: [{ model: User, attributes: ['username', 'fullname'] }, {
                  model: Group,
                  attributes: ['id', 'name']
                }]
              })
                .then((messages) => {
                  // Get list of messages that have not been read by a user with this limit and offset
                  const userUnreadMessages = messages.filter(message =>
                    !(_.includes(message.readersId, userId)));
                  const data = {
                    // paginated messages obtained using offset and limit i.e (4 messages)
                    messages: userUnreadMessages,
                    // count of all messages users have not read (i.e 15)
                    count: userGroupUnreadMessages.length,
                    pages
                  };
                  return handleSuccess(200, data, res);
                })
                .catch(err => handleError(err, res));
            })
            .catch(err => handleError(err, res));
      } else {
        return handleError('This request is invalid. Request URL must have a query named page with number as value', res);
      }
    }
  },
  // Get all users in the application by search term.
  // You can also include array of user Ids in a group
  getAllUsers(req, res) {
    if (req.user) {
      if (req.query.search) {
        // Find all users in the application
        const query = req.query.search.toLowerCase();
        const search = `%${query}%`;
        User.findAll(
          {
            where: { $or: [{ username: { like: search } }, { email: { like: search } }] },
            attributes: ['id', 'username', 'fullname', 'email'],
            limit: 10
          })
            .then((users) => {
              // If a client wants to work with all users in the application and all users of a certain group
              if (req.query.groupId) {
                if (isNaN(parseInt(req.query.groupId, 10))) {
                  return Promise.reject('Query groupId must be a number');
                }
                // get userId of all users in a particular group by the given groupId as object
                const groupId = req.query.groupId;
                const userId = req.user.id;
                Group.findById(groupId)
                    .then((group) => {
                      if (!group) {
                        return Promise.reject({ code: 404, message: 'Invalid group' });
                      }
                      // Check if User belongs to the group
                      return UserGroup.findOne({
                        where: { userId, groupId }
                      });
                    })
                    .then((foundUserAndGroup) => {
                      if (!foundUserAndGroup) {
                        return Promise.reject('Invalid Operation: You don\'t belong to this group');
                      }
                      // get the userId of users that belongs to this group
                      return UserGroup.findAll({
                        where: { groupId: req.query.groupId },
                        attributes: ['userId']
                      });
                    })
                    .then((groupUsers) => {
                      // converts the array of userId objects to standard array of Ids
                      const groupUsersIdInArray = groupUsers.map(groupUser => groupUser.userId);
                      const data = {
                        allUsers: users,
                        groupUsersId: groupUsersIdInArray
                      };
                      return handleSuccess(200, data, res);
                    })
                    .catch(err => handleError(err, res));
              } else { // If a client just want all users in the application
                return handleSuccess(200, users, res);
              }
            })
            .catch(err => handleError(err, res));
      } else {
        return handleError('This request is invalid. Request URL must have a query named search with value', res);
      }
    }
  }
  // Get the list of all groups that a user belongs to but paginated
  // getGroupsUserBelongsToPaginated(req, res) {
  //   if (req.user && req.query.page) {
  //     const userId = req.user.id;
  //     UserGroup.findAndCountAll({where: {userId}, include: [{ model: Group, attributes: ['id', 'name', 'creator_id'] }]})
  //         .then((result)=>{
  //           const data = {
  //             Groups: result.rows,
  //             count: result.count,
  //             id: req.user.id,
  //             username: req.user.username,
  //             fullname: req.user.fullname
  //           };
  //           return handleSuccess(200, data, res);
  //         })
  //         .catch(err => handleError(err, res));
  //   } else {
  //     return handleError('Something went wrong', res);
  //   }
  // },
  // Controller method that allow users retrieve messages from group
  // getUserMessages(req, res) {
  //   // Check to ensure groupId is not a String
  //   if (isNaN(parseInt(req.params.groupId, 10))) {
  //     return handleError('Oops! Something went wrong, Check your route', res);
  //   }
  //   if (req.user && req.params.groupId) {
  //     const userId = req.user.id;
  //     const groupId = req.params.groupId;
  //     Group.findById(req.params.groupId)
  //         .then((group) => {
  //           if (!group) {
  //             return Promise.reject({ code: 404, message: 'invalid group' });
  //           }
  //           // to check if User belongs to the group
  //           return UserGroup.findOne({
  //             where: { userId, groupId }
  //           });
  //         })
  //         .then((foundUserAndGroup) => {
  //           if (!foundUserAndGroup) {
  //             return Promise.reject('Invalid Operation: You don\'t belong to this group');
  //           }
  //           // Let the user have his/her messages if he/she belongs to the group
  //           const criteria = [{ userId }, { groupId }];
  //           return Message.findAndCountAll({ where: { $and: criteria } });
  //           // Another method to get user messages . by using their model relation
  //           // User.find({
  //           //   where: { id: req.user.id, },
  //           //   include: [{ model: Message }]
  //           // })
  //         })
  //         .then((messages) => {
  //           if (messages.rows.length === 0) {
  //             return Promise.reject({ code: 404, message: 'You have no message in this group' });
  //           }
  //           return handleSuccess(200, messages, res);
  //         })
  //         .catch(err => handleError(err, res));
  //   } else {
  //     return handleError('oops! Something went wrong', res);
  //   }
  // }
};

