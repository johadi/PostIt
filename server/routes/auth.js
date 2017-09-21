const router = require('express').Router();
const authController = require('../controllers/auth');

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
 *    "xyzuewiuewuweui.wiiwiewiewiiweabc.eioiewo123.weewewewhgf"
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
 *    "xyzuewiuewuweui.wiiwiewiewiiweabc.eioiewo123.weewewewhgf"
 */
    .post(authController.signin);
module.exports = router;
