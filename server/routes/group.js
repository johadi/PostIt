const router = require('express').Router();
const groupController = require('../controllers/group');
const authenticate = require('../middlewares/authenticate');

router.use(authenticate);
router.route('/api/group')
    .post(groupController.createGroup);
router.route('/api/group/:groupId/user')
    .post(groupController.addUserToGroup);
router.route('/api/group/:groupId/message')
    .get(groupController.getMessages)
    .post(groupController.postMessage);
module.exports = router;
