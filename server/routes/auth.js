const router = require('express').Router();
const authController = require('../controllers/auth');
const verifyLinkMiddleware = require('../middlewares/verifyRecoveryLink');

router.route('/v1/user/signup')
/**
 * @api {post} /api/v1/user/signup Register a new user
 * @apiGroup Authentication
 * @apiParam {String} username Username of user
 * @apiParam {String} fullname Name of user
 * @apiParam {String} mobile Mobile number of user
 * @apiParam {String} email Email of user
 * @apiParam {String} password password of user
 * @apiParam {String} confirmPassword confirm password of user
 * @apiParamExample {json} Input
 *    {
   *      "fullname": "Jimoh Hadi",
   *      "username": "Johadi",
   *      "mobile": "0816304xxxx",
   *      "email": "jimoh@program.com",
   *      "password": "123456"
   *      "confirmPassword": "123456"
   *    }
 * @apiSuccess {String} token Token of authenticated user
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    "xyz.abc.123.hgf"
 */
    .post(authController.signup);
router.route('/v1/user/signin')
/**
 * @api {post} /api/v1/user/signin Login user
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
router.route('/v1/user/recover-password')
/**
 * @api {post} /api/v1/user/recover-password User password recovery
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
router.route('/v1/user/reset-password')
  /**
   * @api {post} /api/v1/user/reset-password User password reset
   * @apiGroup Authentication
   * @apiParam {String} password User password
   * @apiParam {String} confirmPassword User confirm password
   * @apiParam {String} token Token in the query of password reset URL
   * @apiParamExample {json} Input
   *    {
   *      "password": "123456",
   *      "confirmPassword": "123456"
   *    }
   * @apiSuccess {String} message Message for successful password changed
   * @apiSuccessExample {json} Success
   *    HTTP/1.1 200 OK
   *    "Password changed successfully"
   */
  .post(verifyLinkMiddleware, authController.resetPasswordPost);
module.exports = router;
