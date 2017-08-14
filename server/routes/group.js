const router = require('express').Router();
const groupController = require('../controllers/group');
const authenticate = require('../middlewares/authenticate');

router.route('/verify-token')
    .get(authenticate, (req, res) => {
      if (req.user) {
        return res.status(200).json('user verified');
      }
    });
router.route('/group')
/**
 * @api {post} /api/group Create a group
 * @apiGroup Group
 * @apiHeader {String} Token of authenticated user
 * @apiHeaderExample {json} Header
 *    {"x-auth": "JWT xyz.abc.123.hgf"}
 * @apiParam {String} name Group title
 * @apiParamExample {json} Input
 *    {"name": "Andela"}
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 201 CREATED
 *    {
     *      "id": 1,
     *      "name": "andela",
     *      "updated_at": "2016-02-10T15:46:51.778Z",
     *      "created_at": "2016-02-10T15:46:51.778Z",
     *      "creator_id": 5
     *    }
 */
    .post(authenticate, groupController.createGroup);
router.route('/group/:groupId/user')
/**
 * @api {post} /api/group/:groupId/user Add user to group
 * @apiGroup Group
 * @apiHeader {String} Token of authenticated user
 * @apiHeaderExample {json} Header
 *    {"x-auth": "JWT xyz.abc.123.hgf"}
 * @apiParam {id} Id of group
 * @apiParamExample {json} Input
 *    {"name": "Ortwel"}
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 201 CREATED
 *    {
     *      "message": "User added successfully",
     *      "addedUser": "Ortwel",
     *      "addedBy": "johadi"
     *    }
 */
    .post(authenticate, groupController.addUserToGroup);
router.route('/group/:groupId/message')
/**
 * @api {get} /api/group/:groupId/message Get group messages
 * @apiGroup Message
 * @apiHeader {String} Token of authenticated user
 * @apiHeaderExample {json} Header
 *    {"x-auth": "JWT xyz.abc.123.hgf"}
 * @apiParam {id} Id of group
 * @apiParam {String} Username
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *        "count": 2,
 *        "pages": 1,
 *        "rows": [{
 *          "id": 1,
 *          "message": "Programming is in the mind",
 *          "updated_at": "2017-06-10T15:46:51.778Z",
 *          "created_at": "2017-06-10T15:46:51.778Z",
 *          "User": {
 *            "id": 3,
 *            "username": "johadi",
 *            "fullname": "jimoh hadi"
 *          }
 *        },
 *        {
 *          "id": 4,
 *          "message": "I love Programming",
 *          "updated_at": "2017-05-10T15:46:51.778Z",
 *          "created_at": "2017-05-10T15:46:51.778Z",
 *          "User": {
 *            "id": 6,
 *            "username": "mary",
 *            "fullname": "john mary"
 *          }
 *        }]
 *    }
 */
    .get(authenticate, groupController.getMessages);
router.route('/group/:groupId/message')
    /**
     * @api {post} /api/group/:groupId/message POST messages to group
     * @apiGroup Message
     * @apiHeader {String} Token of authenticated user
     * @apiHeaderExample {json} Header
     *    {"x-auth": "JWT xyz.abc.123.hgf"}
     * @apiParam {id} Id of group
     * @apiParam {String} Message to send to group
     * @apiSuccessExample {json} Success
     *    HTTP/1.1 201 CREATED
     *
     *      "created successfully"
     */
    .post(authenticate, groupController.postMessage);
// router.route('/group/:groupId/user/message')
//     .get(groupController.getUserMessages);
router.route('/group/:groupId/message/:messageId')
/**
 * @api {get} /api/group/:groupId/message/:messageId Get a message in a group
 * @apiGroup Message
 * @apiHeader {String} Token of authenticated user
 * @apiHeaderExample {json} Header
 *    {"x-auth": "JWT xyz.abc.123.hgf"}
 * @apiParam {id} Id of group
 * @apiParam {id} Id of message
 * @apiParam {String} Username
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *       {
 *          "id": 4,
 *          "message": "I love Programming",
 *          "updated_at": "2017-05-10T15:46:51.778Z",
 *          "created_at": "2017-05-10T15:46:51.778Z",
 *          "User": {
 *            "id": 6,
 *            "username": "mary",
 *            "fullname": "john mary"
 *          }
 *        }
 */
    .get(authenticate, groupController.viewMessage); // view single notification
router.route('/group/:groupId/group-users')
/**
 * @api {get} /api/group/:groupId/group-users Get group members
 * @apiGroup User
 * @apiHeader {String} Token of authenticated user
 * @apiHeaderExample {json} Header
 *    {"x-auth": "JWT xyz.abc.123.hgf"}
 * @apiParam {id} Id of group
 * @apiParam {String} Username
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *        "id": 7,
 *        "name": "andela"
 *        "count": 2,
 *        "pages": 1,
 *        "Users": [{
 *          "id": 1,
 *          "username": "johadi",
 *          "fullname": "jimoh hadi",
 *        },
 *        {
 *          "id": 3,
 *          "username": "sanni",
 *          "fullname": "ali sanni"
 *        }]
 *    }
 */
  .get(authenticate, groupController.getGroupUsers);
router.route('/group/message-read/:messageId')
/**
 * @api {post} /api/group/message-read POST update status of message whether read or not
 * @apiGroup Message
 * @apiHeader {String} Token of authenticated user
 * @apiHeaderExample {json} Header
 *    {"x-auth": "JWT xyz.abc.123.hgf"}
 * @apiParam {id} Id of message
 * @apiParam {String} Message of a group
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *
 *      true
 */
    .post(authenticate, groupController.updateMessageReadStatus);
<<<<<<< HEAD
router.route('/group/user/groups')
=======
router.route('/group/:groupId/group-users?page=1')
/**
 * @api {get} /api/group/:groupId/group-users Get group members
 * @apiGroup User
 * @apiHeader {String} Token of authenticated user
 * @apiHeaderExample {json} Header
 *    {"x-auth": "JWT xyz.abc.123.hgf"}
 * @apiParam {id} Id of group
 * @apiParam {String} Username
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *        "id": 7,
 *        "name": "andela"
 *        "count": 2,
 *        "pages": 1,
 *        "Users": [{
 *          "id": 1,
 *          "username": "johadi",
 *          "fullname": "jimoh hadi",
 *        },
 *        {
 *          "id": 3,
 *          "username": "sanni",
 *          "fullname": "ali sanni"
 *        }]
 *    }
 */
    .get(authenticate, groupController.getGroupUsers);
router.route('/group/user/groups?page=1')
>>>>>>> 58580431ba6e300ef62e47cc6a5f0dbc8de90187
/**
 * @api {get} /api/group/user/groups Get user's groups
 * @apiGroup User
 * @apiHeader {String} Token of authenticated user
 * @apiHeaderExample {json} Header
 *    {"x-auth": "JWT xyz.abc.123.hgf"}
 * @apiParam {String} Username
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *        "id": 1,
 *        "username": "johadi",
 *        "fullname": "jimoh hadi",
 *        "count": 2,
 *        "pages": 1,
 *        "Groups": [{
 *          "id": 1,
 *          "name": "andela",
 *          "creator_id": 8,
 *        },
 *        {
 *          "id": 3,
 *          "name": "sport",
 *          "creator_id": 2
 *        }]
 *    }
 */
    .get(authenticate, groupController.getGroupsUserBelongsTo);
router.route('/group/user/board')
/**
 * @api {get} /api/group/user/board Get user's unread messages in all joined groups
 * @apiGroup User
 * @apiHeader {String} Token of authenticated user
 * @apiHeaderExample {json} Header
 *    {"x-auth": "JWT xyz.abc.123.hgf"}
 * @apiParam {String} Username
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *        "count": 2,
 *        "pages": 1,
 *        "messages": [
 *          {
 *            "id": 12,
 *            "body": "No man is an island espcially in learning",
 *            "User": {
 *             "username": "johadi",
 *             "fullname": "jimoh hadi"
 *            },
 *            "Group": {
 *              "id": 5,
 *              "name": "sport"
 *            }
 *          },
 *         {
 *            "id": 9,
 *            "body": "There is no limitation in learning",
 *            "User": {
 *             "username": "sanni",
 *             "fullname": "muhammed sanni"
 *            },
 *            "Group": {
 *              "id": 17,
 *              "name": "programming"
 *            }
 *          }
 *        ]
 *    }
 */
    .get(authenticate, groupController.userMessageBoard);
router.route('/users')
/**
 * @api {get} /api/users?search=joh Get at most 10 users in the application that match the search term only
 * @apiGroup User
 * @apiHeader {String} Token of authenticated user
 * @apiHeaderExample {json} Header
 *    {"x-auth": "JWT xyz.abc.123.hgf"}
 * @apiParam {String} Username
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *       [
 *          {
 *            "id": 1,
 *            "username": "johadi",
 *            "fullname": "jimoh hadi",
 *            "email": "johadi@test.com",
 *          },
 *         {
 *            "id": 5,
 *            "username": "john121",
 *            "fullname": "john daniel",
 *            "email": "john@test.com",
 *          },
 *        ],
 */
/**
 * @api {get} /api/users?search=joh&groupId=3 Get at most 10 users in the application that match the search term and userId of a group
 * @apiGroup User
 * @apiHeader {String} Token of authenticated user
 * @apiHeaderExample {json} Header
 *    {"x-auth": "JWT xyz.abc.123.hgf"}
 * @apiParam {String} Username
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *        "allUsers": [
 *          {
 *            "id": 1,
 *            "username": "johadi",
 *            "fullname": "jimoh hadi",
 *            "email": "johadi@test.com",
 *          },
 *         {
 *            "id": 5,
 *            "username": "john121",
 *            "fullname": "john daniel",
 *            "email": "john@test.com",
 *          },
 *        ],
 *        groupUsersId: [1,4,6,8,9,0]
 *    }
 */
    .get(authenticate, groupController.getAllUsers);
module.exports = router;
