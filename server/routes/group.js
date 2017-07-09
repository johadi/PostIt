const router = require('express').Router();
const groupController = require('../controllers/group');
const authenticate = require('../middlewares/authenticate');

router.use(authenticate);
router.route('/api/group')
    .post(groupController.createGroup);
router.route('/api/group/:groupId/user')
    .post(groupController.groupAddUser);
router.route('/api/group/:group_id/message')
    .get(groupController.postMessage)
    .post(groupController.getMessage);
module.exports = router;
