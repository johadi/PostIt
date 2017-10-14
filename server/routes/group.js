const router = require('express').Router();
const groupController = require('../controllers/group');
const authenticate = require('../middlewares/authenticate');

router.route('/v1/verify-token')
    .get(authenticate, (req, res) => {
      if (req.user) {
        return res.status(200).json('user verified');
      }
    });
router.route('/v1/group')
/**
 * @api {post} /api/v1/group Create a group
 * @apiGroup Group
 * @apiHeader {String} token token of authenticated user
 * @apiHeaderExample {json} Header
 *    {"x-auth": "JWT xyz.abc.123.hgf"}
 * @apiParam {String} name Group name
 * @apiParamExample {json} Input
 *    {"name": "Andela"}
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 201 CREATED
 *    {
 *      "id": 1,
 *      "name": "andela",
 *      "updated_at": "2016-02-10T15:46:51.778Z",
 *      "created_at": "2016-02-10T15:46:51.778Z",
 *      "creatorId": 5
 *    }
 */
    .post(authenticate, groupController.createGroup);
router.route('/v1/group/:groupId/user')
/**
 * @api {post} /api/v1/group/:groupId/user Add user to group
 * @apiGroup Group
 * @apiHeader {String} token Token of authenticated user
 * @apiHeaderExample {json} Header
 *    {"x-auth": "JWT xyz.abc.123.hgf"}
 * @apiParam {Number} groupId ID of group
 * @apiParam {String} username Username of a user
 * @apiParamExample {json} Input
 *    {"username": "Ortwel"}
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 201 CREATED
 *    {
 *      "message": "User added successfully",
 *      "addedUser": "Ortwel",
 *      "addedBy": "johadi"
 *    }
 */
    .post(authenticate, groupController.addUserToGroup);
router.route('/v1/group/:groupId/group-users')
/**
 * @api {get} /api/v1/group/:groupId/group-users Get group members
 * @apiGroup Group
 * @apiHeader {String} token token of authenticated user
 * @apiHeaderExample {json} Header
 *    {"x-auth": "JWT xyz.abc.123.hgf"}
 * @apiParam {Number} groupId ID of a group
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *        "id": 7,
 *        "name": "andela"
 *        "count": 2,
 *        "pages": 1,
 *        "users": [{
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
module.exports = router;
