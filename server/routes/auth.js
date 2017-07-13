const router = require('express').Router();
const authController = require('../controllers/auth');

router.route('/api/user/signup')
    .post(authController.signup);
router.route('/api/user/signin')
    .post(authController.signin);
module.exports = router;
