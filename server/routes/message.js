const router = require('express').Router();
const messageController = require('../controllers/message');
const authenticate = require('../middlewares/authenticate');

router.route('/v1/group/:groupId/message')
/**
 * @api {get} /api/v1/group/:groupId/message Get group messages
 * @apiGroup Message
 * @apiHeader {String} token Token of authenticated user
 * @apiHeaderExample {json} Header
 *    {"x-auth": "JWT xyz.abc.123.hgf"}
 * @apiParam {Number} groupId ID of a group
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
  .get(authenticate, messageController.getMessages);
router.route('/v1/group/:groupId/message')
/**
 * @api {post} /api/v1/group/:groupId/message POST messages to group
 * @apiGroup Message
 * @apiHeader {String} token Token of authenticated user
 * @apiHeaderExample {json} Header
 *    {"x-auth": "JWT xyz.abc.123.hgf"}
 * @apiParam {Number} groupId ID of group
 * @apiParam {String} message Message to send to group
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 201 CREATED
 *
 *      "created successfully"
 */
  .post(authenticate, messageController.postMessage);
router.route('/v1/group/:groupId/message/:messageId')
/**
 * @api {get} /api/v1/group/:groupId/message/:messageId Get a message in a group
 * @apiGroup Message
 * @apiHeader {String} Token of authenticated user
 * @apiHeaderExample {json} Header
 *    {"x-auth": "JWT xyz.abc.123.hgf"}
 * @apiParam {Number} groupId ID of group
 * @apiParam {Number} messageId ID of message
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
// view single notification
  .get(authenticate, messageController.viewMessage);
router.route('/v1/group/message-read/:messageId')
/**
 * @api {post} /api/v1/group/message-read/:messageId POST update
 * status of message when it is read
 * @apiGroup Message
 * @apiHeader {String} token Token of authenticated user
 * @apiHeaderExample {json} Header
 *    {"x-auth": "JWT xyz.abc.123.hgf"}
 * @apiParam {Number} messageId ID of message
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *
 *      true
 */
  .post(authenticate, messageController.updateMessageReadStatus);
module.exports = router;
