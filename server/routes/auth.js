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
 * @apiSuccess {String} token Token of authenticated user
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    "xyz.abc.123.hgf"
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
 *    "xyz.abc.123.hgf"
 */
    .post(authController.signin);
router.route('/user/recover-password')
/**
 * @api {post} /api/user/recover-password User recovery password
 * @apiGroup Authentication
 * @apiParam {String} email Email of registered user
 * @apiParamExample {json} Input
 *    {
   *      "email": "jimoh@gmail.com",
   *    }
 * @apiSuccess {String} message Success message
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    "Password recovery link sent to your email"
 */
  .post(authController.passwordRecovery);
router.route('/user/reset-password')
  .get(verifyLinkMiddleware, authController.resetPasswordGet)
  /**
   * @api {post} /api/user/reset-password User reset Password
   * @apiGroup Authentication
   * @apiParam {String} password User password
   * @apiParam {String} confirmPassword User confirm password
   * @apiParamExample {json} Input
   *    {
   *      "password": "123456",
   *      "confirm password": "123456"
   *    }
   * @apiSuccess {String} message Message for successful password changed
   * @apiSuccessExample {json} Success
   *    HTTP/1.1 200 OK
   *    "Password changed successfully"
   */
  .post(verifyLinkMiddleware, authController.resetPasswordPost);
module.exports = router;
