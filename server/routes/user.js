const router = require('express').Router();
const userController = require('../controllers/user');
const authenticate = require('../middlewares/authenticate');

router.route('/v1/group/user/groups')
/**
 * @api {get} /api/v1/group/user/groups Get user's groups
 * @apiGroup Group
 * @apiHeader {String} token Token of authenticated user
 * @apiHeaderExample {json} Header
 *    {"x-auth": "JWT xyz.abc.123.hgf"}
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *        "id": 1,
 *        "username": "johadi",
 *        "fullname": "jimoh hadi",
 *        "count": 2,
 *        "pages": 1,
 *        "groups": [{
 *          "id": 1,
 *          "name": "andela",
 *          "creatorId": 8,
 *        },
 *        {
 *          "id": 3,
 *          "name": "sport",
 *          "creatorId": 2
 *        }]
 *    }
 */
  .get(authenticate, userController.getUserGroups);
router.route('/v1/group/user/board')
/**
 * @api {get} /api/v1/group/user/board Get user's unread messages in all joined groups
 * @apiGroup Message
 * @apiHeader {String} token Token of authenticated user
 * @apiHeaderExample {json} Header
 *    {"x-auth": "JWT xyz.abc.123.hgf"}
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
  .get(authenticate, userController.userMessageBoard);
router.route('/v1/users')
/**
 * @api {get} /api/v1/users?search=joh&groupId=3
 * Get users in the application that match the search term
 * @apiGroup Group
 * @apiHeader {String} token Token of authenticated user
 * @apiHeaderExample {json} Header
 *    {"x-auth": "JWT xyz.abc.123.hgf"}
 * @apiParam {String} search Search term
 * @apiParam {Number} groupId ID of a group
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
 *        ]
 *    }
 */
  .get(authenticate, userController.getSearchedUsers);
module.exports = router;
