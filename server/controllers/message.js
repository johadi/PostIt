const lodash = require('lodash');
const P = require('bluebird');
const User = require('../database/models').User;
const Group = require('../database/models').Group;
const UserGroup = require('../database/models').UserGroup;
const UserGroupAdd = require('../database/models').UserGroupAdd;
const Message = require('../database/models').Message;
const Constants = require('../helpers/constants');
const { sendSMS, sendMail, handleError,
  handleSuccess } = require('../helpers/helpers');

module.exports = {
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
        if (!(lodash.includes(priorities,
            req.body.priority.toLowerCase()))) {
          return handleError('Message priority level can only ' +
            'be normal or urgent or critical', res);
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
            return Promise.reject('Invalid Operation: You can\'t post ' +
              'to group You don\'t belong');
          }
          // Create Message if he belongs to this group
          return Message.create({ userId, body, priority, groupId });
        })
        .then((messageCreated) => {
          if (!messageCreated) {
            return Promise.reject({ code: 400,
              message: 'Problem creating message...Try again' });
          }
          // Since he is the sender let make him a person that has read the post
          // readersId keeps track of all users that have read the post.
          // hence, we update it accordingly
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
                  // Bluebird map return array Promises values
                  // just like Promise.all()
                  P.map(groupAndMembers,
                    groupAndMember => groupAndMember.User.email))
                .then((groupMemberEmails) => {
                  // We handle our send email here
                  const from = 'no-reply <jimoh@google.com>';
                  // groupMemberEmails is an array of emails
                  const to = groupMemberEmails;
                  const subject = 'Notification from PostIt';
                  const message = '<h2>' +
                    'Hi!, you have one notification from PostIt' +
                    '</h2><h3>Notification level: Urgent</h3>' +
                    '<p><a href="https://jimoh-postit.herokuapp.com">' +
                    'Login to your PostIt account to view</a></p>' +
                    '<p>The PostIt management team!!!</p>';
                  sendMail(from, to, subject, message);
                });
            }
            // CRITICAL: Send Email, SMS and In-app notification to group members
          } else if (updatedMessage.priority === 'critical') {
            handleSuccess(201, 'Message created successfully', res);
            if (process.env.NODE_ENV !== 'test') {
              // get members of this group
              UserGroup.findAll({
                where: { groupId: updatedMessage.groupId },
                include: [{ model: User,
                  attributes: ['username', 'email', 'mobile'] }]
              })
                .then(groupAndMembers =>
                  // Using map of Bluebird promises (P)
                  // Bluebird map return array of Promises
                  // values just like Promise.all()
                  P.map(groupAndMembers, (groupAndMember) => {
                    // We handle SMS here
                    const to = '+2347082015065';
                    const from = '+12568264564';
                    const smsBody = `Hi ${groupAndMember.User.username}, 
                       You have one notification from PostIt. 
                       you can login to view at https://jimoh-postit.herokuapp.com`;
                    sendSMS(from, to, smsBody);
                    // return email for use in sendMail
                    return groupAndMember.User.email;
                  }))
                .then((groupMemberEmails) => {
                  // Handle our send email here
                  const from = 'no-reply <jimoh@google.com>';
                  // groupMemberEmails is an array of emails
                  const to = groupMemberEmails;
                  const subject = 'Notification from PostIt';
                  const message = '<h2>Hi!, you have one notification from PostIt</h2>' +
                    '<h3>Notification level: Critical</h3>' +
                    '<p><a href="https://jimoh-postit.herokuapp.com">' +
                    'Login to your PostIt account to view</a></p>' +
                    '<p>The PostIt mangement team!!!</p>';
                  sendMail(from, to, subject, message);
                });
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
        return handleError('This request is invalid. Request URL must contain ' +
          'query parameter named page with number as value', res);
      }
      const query = parseInt(req.query.page, 10);
      Group.findById(req.params.groupId)
        .then((group) => {
          if (!group) {
            return Promise.reject({ code: 404, message: 'invalid group' });
          }
          // To check if User belongs to the group
          return UserGroup.findOne({
            where: { userId, groupId }
          });
        })
        .then((foundUserAndGroup) => {
          if (!foundUserAndGroup) {
            return Promise.reject('Invalid Operation: You don\'t belong ' +
              'to this group');
          }
          // Let the user view messages if he/she belongs to the group
          // perPage = limit you want to display per page
          const perPage = Constants.GET_MESSAGES_PER_PAGE;
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
              const getMessagesData = {
                count: messages.count,
                pages,
                rows: messages.rows
              };
              return handleSuccess(200, getMessagesData, res);
            })
            .catch(err => handleError(err, res));
        })
        .catch(err => handleError(err, res));
    }
  },
  // to view a particular message
  viewMessage(req, res) {
    if (isNaN(parseInt(req.params.groupId, 10)) ||
      isNaN(parseInt(req.params.messageId, 10))) {
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
            return Promise.reject('Invalid Operation: You don\'t belong ' +
              'to this group');
          }
          // Let the user read the message since he satisfies all the criteria
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
            return Promise.reject({ code: 404,
              message: 'Message with this ID doesn\'t exist' });
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
            .then(() => handleSuccess(200, true, res))
            .catch(err => handleError(err, res));
        })
        .catch(err => handleError(err, res));
    }
  },
};
