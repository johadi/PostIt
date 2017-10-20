import express from 'express';
import userController from '../controllers/user';
import authenticate from '../middlewares/authenticate';

const router = express.Router();
router.route('/v1/group/user/groups')
/**
 * @swagger
 * /api/v1/group/user/groups:
 *   get:
 *     tags:
 *       - User
 *     description: Get groups a user belongs to
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: x-auth
 *         in: header
 *         description: authentication token
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Array of user groups
 *         schema:
 *           properties:
 *             id:
 *               type: integer
 *             username:
 *               type: string
 *             fullname:
 *               type: string
 *             count:
 *               type: integer
 *             pages:
 *               type: integer
 *             groups:
 *               type: array
 */
  .get(authenticate, userController.getUserGroups);
router.route('/v1/group/user/board')
/**
 * @swagger
 * /api/v1/group/user/board:
 *   get:
 *     tags:
 *       - User
 *     description: Get user's unread messages in all joined groups
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: x-auth
 *         in: header
 *         description: authentication token
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Array of user's unread messages
 *         schema:
 *           properties:
 *             count:
 *               type: integer
 *             pages:
 *               type: integer
 *             messages:
 *               type: array
 */
  .get(authenticate, userController.userMessageBoard);
router.route('/v1/users')
/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     tags:
 *       - User
 *     description: Get users in the application that match the search term
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: x-auth
 *         in: header
 *         description: authentication token
 *         required: true
 *         type: string
 *       - name: search
 *         in: query
 *         description: search term
 *         type: string
 *     responses:
 *       200:
 *         description: Array of users that match the search term
 *         schema:
 *           properties:
 *             allUsers:
 *               type: array
 */
  .get(authenticate, userController.getSearchedUsers);
export default router;
