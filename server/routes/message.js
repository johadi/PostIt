import express from 'express';
import messageController from '../controllers/message';
import authenticate from '../middlewares/authenticate';

const router = express.Router();
router.route('/v1/group/:groupId/message')
/**
 * @swagger
 * /api/v1/group/{groupId}/message:
 *   get:
 *     tags:
 *       - Message
 *     description: Get messages of a group
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: groupId
 *         description: Group ID parameter
 *         in: path
 *         required: true
 *         type: integer
 *       - name: x-auth
 *         in: header
 *         description: authentication token
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Array of messages in a group with this groupId parameter
 *         schema:
 *           properties:
 *             count:
 *               type: integer
 *             pages:
 *               type: integer
 *             rows:
 *               type: array
 */
  .get(authenticate, messageController.getMessages);
router.route('/v1/group/:groupId/message')
/**
 * @swagger
 * /api/v1/group/{groupId}/message:
 *   post:
 *     tags:
 *       - Message
 *     description: Post message to a group
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: groupId
 *         description: Group ID parameter
 *         in: path
 *         required: true
 *         type: integer
 *       - name: x-auth
 *         in: header
 *         description: authentication token
 *         required: true
 *         type: string
 *       - name: message
 *         in: formData
 *         description: message body to post to group
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Message created successfully
 *         schema:
 *           properties:
 *             message:
 *               type: string
 */
  .post(authenticate, messageController.postMessage);
router.route('/v1/group/:groupId/message/:messageId')
/**
 * @swagger
 * /api/v1/group/{groupId}/message/{messageId}:
 *   get:
 *     tags:
 *       - Message
 *     description: View a message in a group
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: groupId
 *         description: Group ID parameter
 *         in: path
 *         required: true
 *         type: integer
 *       - name: messageId
 *         description: Message ID parameter
 *         in: path
 *         required: true
 *         type: integer
 *       - name: x-auth
 *         in: header
 *         description: authentication token
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: View message in a group with this groupId and messageId parameters
 *         schema:
 *           properties:
 *             id:
 *               type: integer
 *             message:
 *               type: string
 *             updated_at:
 *               type: string
 *             created_at:
 *               type: string
 *             User:
 *               type: object
 */
// view single notification
  .get(authenticate, messageController.viewMessage);
router.route('/v1/group/message-read/:messageId')
/**
 * @swagger
 * /api/v1/group/message-read/{messageId}:
 *   post:
 *     tags:
 *       - Message
 *     description: Update message read status
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: messageId
 *         description: Message ID parameter
 *         in: path
 *         required: true
 *         type: integer
 *       - name: x-auth
 *         in: header
 *         description: authentication token
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Message updated successfully
 *         schema:
 *           properties:
 *             status:
 *               type: boolean
 */
  .post(authenticate, messageController.updateReadMessage);
export default router;
