const router = require('express').Router();
const groupController = require('../controllers/group');

router.route('/api/group')
    .post(groupController.createGroup);
router.route('/api/group/:group_id/user')
    .post(groupController.addUser);
router.route('/api/group/:group_id/message')
    .get(groupController.postMessage)
    .post(groupController.getMessage);
module.exports = router;
