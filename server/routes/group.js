const router = require('express').Router();
const groupController = require('../controllers/group');
const authenticate = require('../middlewares/authenticate');

router.route('/v1/verify-token')
/**
 * @swagger
 * /api/v1/verify-token:
 *   get:
 *     tags:
 *       - Authentication
 *     description: Verify user token
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
 *         description: Verified user details
 *         schema:
 *           properties:
 *             id:
 *               type: integer
 *             username:
 *               type: string
 *             fullname:
 *               type: string
 *             email:
 *               type: string
 *             mobile:
 *               type: string
 */
    .get(authenticate, (req, res) => {
      if (req.user) {
        return res.status(200).json(req.user);
      }
    });
router.route('/v1/group')
/**
 * @swagger
 * /api/v1/group:
 *   post:
 *     tags:
 *       - Group
 *     description: Create a group
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         description: Group name
 *         in: formData
 *         required: true
 *         schema:
 *           type: string
 *       - name: x-auth
 *         in: header
 *         description: authentication token
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Created group details
 *         schema:
 *           properties:
 *             id:
 *               type: integer
 *             name:
 *               type: string
 *             updated_at:
 *               type: string
 *             created_at:
 *               type: string
 *             creatorId:
 *               type: integer
 */
    .post(authenticate, groupController.createGroup);
router.route('/v1/group/:groupId/user')
/**
 * @swagger
 * /api/v1/group/{groupId}/user:
 *   post:
 *     tags:
 *       - Group
 *     description: Add User to group
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: username
 *         description: Username of a user
 *         in: formData
 *         required: true
 *         schema:
 *           type: string
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
 *         description: User successfully added
 *         schema:
 *           properties:
 *             message:
 *               type: string
 *             addedUser:
 *               type: string
 *             addedBy:
 *               type: string
 */
    .post(authenticate, groupController.addUserToGroup);
router.route('/v1/group/:groupId/group-users')
/**
 * @swagger
 * /api/v1/group/{groupId}/group-users:
 *   get:
 *     tags:
 *       - Group
 *     description: Get members in a group
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
 *         description: Array of group members
 *         schema:
 *           properties:
 *             id:
 *               type: integer
 *             name:
 *               type: string
 *             count:
 *               type: integer
 *             pages:
 *               type: integer
 *             users:
 *               type: array
 */
  .get(authenticate, groupController.getGroupUsers);
module.exports = router;
