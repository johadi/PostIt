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
 *       - name: offset
 *         description: optional pagination offset query
 *         in: query
 *         type: integer
 *       - name: limit
 *         description: optional pagination limit query
 *         in: query
 *         type: integer
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
 *             metaData:
 *               type: object
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
 *       - name: offset
 *         description: optional pagination offset query
 *         in: query
 *         type: integer
 *       - name: limit
 *         description: optional pagination limit query
 *         in: query
 *         type: integer
 *     responses:
 *       200:
 *         description: Array of user's unread messages
 *         schema:
 *           properties:
 *             metaData:
 *               type: object
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
 *       - name: offset
 *         description: optional pagination offset query
 *         in: query
 *         type: integer
 *       - name: limit
 *         description: optional pagination limit query
 *         in: query
 *         type: integer
 *       - name: groupId
 *         description: optional groupId query to get id of users in the group
 *         in: query
 *         type: integer
 *     responses:
 *       200:
 *         description: Array of users that match the search term
 *         schema:
 *           properties:
 *             allUsers:
 *               type: array
 *             groupUsersId:
 *                type: array
 *             metaData:
 *                type: object
 */
  .get(authenticate, userController.getUsers);
router.route('/v1/user')
  .post(authenticate, userController.updateUserProfile);
export default router;
