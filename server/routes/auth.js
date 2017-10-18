const router = require('express').Router();
const authController = require('../controllers/auth');
const verifyLinkMiddleware = require('../middlewares/verifyRecoveryLink');

router.route('/v1/user/signup')
/**
 * @swagger
 * /api/v1/user/signup:
 *   post:
 *     tags:
 *       - Authentication
 *     description: Register a new user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: fullname
 *         description: User full name
 *         in: formData
 *         required: true
 *         schema:
 *           type: string
 *       - name: username
 *         description: Username of the user
 *         in: formData
 *         required: true
 *         schema:
 *           type: string
 *       - name: email
 *         description: User email
 *         in: formData
 *         required: true
 *         schema:
 *           type: string
 *       - name: password
 *         description: User password
 *         in: formData
 *         required: true
 *         schema:
 *           type: string
 *       - name: confirmPassword
 *         description: User confirm password
 *         in: formData
 *         required: true
 *         schema:
 *           type: string
 *       - name: mobile
 *         description: User mobile number
 *         in: formData
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Token of authenticated user
 *         schema:
 *           properties:
 *             token:
 *               type: string
 */

    .post(authController.signup);
router.route('/v1/user/signin')
/**
 * @swagger
 * /api/v1/user/signin:
 *   post:
 *     tags:
 *       - Authentication
 *     description: Login a user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: username
 *         description: Username of the user
 *         in: formData
 *         required: true
 *         schema:
 *           type: string
 *       - name: password
 *         description: Password of the user
 *         in: formData
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Token of authenticated user
 *         schema:
 *           properties:
 *             token:
 *               type: string
 */
    .post(authController.signin);
router.route('/v1/user/recover-password')
/**
 * @swagger
 * /api/v1/user/recover-password:
 *   post:
 *     tags:
 *       - Authentication
 *     description: Recover password of a user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: email
 *         description: Valid email of the user
 *         in: formData
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Message for recovery sent email
 *         schema:
 *           properties:
 *             message:
 *               type: string
 */
  .post(authController.passwordRecovery);
router.route('/v1/user/reset-password')
/**
 * @swagger
 * /api/v1/user/reset-password:
 *   post:
 *     tags:
 *       - Authentication
 *     description: Reset user password
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: password
 *         description: New password of the user
 *         in: formData
 *         required: true
 *         schema:
 *           type: string
 *       - name: confirmPassword
 *         description: Confirm new password of the user
 *         in: formData
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Password reset message
 *         schema:
 *           properties:
 *             token:
 *               type: string
 */
  .post(verifyLinkMiddleware, authController.resetPasswordPost);
module.exports = router;
