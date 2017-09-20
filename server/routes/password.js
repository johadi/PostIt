const router = require('express').Router();
const authController = require('../controllers/password');
const verifyLinkMiddleware = require('../middlewares/verifyRecoveryLink');

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
