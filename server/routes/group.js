const router = require('express').Router();
const groupController = require('../controllers/group');
const authenticate = require('../middlewares/authenticate');

router.use(authenticate);
router.route('/api/group')
    .post(groupController.createGroup);
router.route('/api/group/:groupId/user')
    .post(groupController.groupAddUser);
router.route('/api/group/:groupId/message')
    .get(groupController.getMessage)
    .post(groupController.postMessage);
module.exports = router;
