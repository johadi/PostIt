const router = require('express').Router();
const groupController = require('../controllers/group');
const authenticate = require('../middlewares/authenticate');

router.use(authenticate);
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
 *    HTTP/1.1 200 OK
 *    {
     *      "status": 200,
     *      "data": {
     *        "id": 1,
     *        "name": "Andela",
     *        "updated_at": "2016-02-10T15:46:51.778Z",
     *        "created_at": "2016-02-10T15:46:51.778Z"
     *      }
     *    }
 */
    .post(groupController.createGroup);
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
 *    HTTP/1.1 200 OK
 *    {
     *      "status": 200,
     *      "data": {
     *         "message": "User added successfully",
     *         "name": "Ortwel",
     *         "groupId": "1",
     *         "addedById": "2"
     *      }
     *    }
 */
    .post(groupController.addUserToGroup);
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
 *        "status": 200,
 *        "data": {
 *          "count": 1,
   *        "rows" : [{
   *        "id": 1,
   *        "message": "Programming is in the mind",
   *        "updated_at": "2016-02-10T15:46:51.778Z",
   *        "created_at": "2016-02-10T15:46:51.778Z",
   *      }]
 *        }
   *    }
 */
    .get(groupController.getMessages);
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
     *    {
   *      "status": 1,
   *       "message": "created successfully"
   *    }
     */
    .post(groupController.postMessage);
// router.route('/api/group/:groupId/user/message')
//     .get(groupController.getUserMessages);
module.exports = router;
