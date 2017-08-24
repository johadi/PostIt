const router = require('express').Router();
const authController = require('../controllers/auth');
const verifyLinkMiddleware = require('../middlewares/verifyRecoveryLink');

router.route('/user/signup')
/**
 * @api {post} /api/user/signup Register a new user
 * @apiGroup User
 * @apiParam {String} username User name
 * @apiParam {String} fullname Name of user
 * @apiParam {String} mobile Mobile number of user
 * @apiParam {String} email User email
 * @apiParam {String} password User password
 * @apiParamExample {json} Input
 *    {
   *      "fullname": "Jimoh Hadi",
   *      "username": "Johadi",
   *      "mobile": "0816304xxxx",
   *      "email": "jimoh@program.com",
   *      "password": "123456"
   *    }
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
   *      "status": 200,
   *      "data": {
   *       "id": 1,
   *      "fullname": "Jimoh Hadi",
   *      "email": "john@program.com",
   *      "username": "Johdi",
   *      "mobile": "0816304xxxx"
   *      }
   *    }
 */
    .post(authController.signup);
router.route('/user/signin')
/**
 * @api {post} /api/user/signin Login user
 * @apiGroup Authentication
 * @apiParam {String} username Username of registered user
 * @apiParam {String} password User password
 * @apiParamExample {json} Input
 *    {
   *      "username": "johadi",
   *      "password": "123456"
   *    }
 * @apiSuccess {String} token Token of authenticated user
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
     *     "status": 200,
     *     "data": {
     *        "token": "xyz.abc.123.hgf"
     *        "message": "Sign in successful"
     *     }
     *  }
 */
    .post(authController.signin);
router.route('/user/recover-password')
  .post(authController.passwordRecovery);
router.route('/user/reset-password')
  .get(verifyLinkMiddleware, authController.resetPasswordGet)
  .post(verifyLinkMiddleware, authController.resetPasswordPost);
module.exports = router;
