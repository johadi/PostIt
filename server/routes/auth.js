const router = require('express').Router();
const authController = require('../controllers/auth');

router.route('/api/user/signup')
/**
 * @api {post} /api/user/signup Register a new user
 * @apiGroup User
 * @apiParam {String} name User name
 * @apiParam {String} email User email
 * @apiParam {String} password User password
 * @apiParamExample {json} Input
 *    {
   *      "name": "John Connor",
   *      "email": "john@connor.net",
   *      "password": "123456"
   *    }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
   *      "id": 1,
   *      "name": "John Connor",
   *      "email": "john@connor.net",
   *      "password": "$2a$10$SK1B1",
   *      "updated_at": "2016-02-10T15:20:11.700Z",
   *      "created_at": "2016-02-10T15:29:11.700Z"
   *    }
 */
    .post(authController.signup);
router.route('/api/user/signin')
    .post(authController.signin);
module.exports = router;
