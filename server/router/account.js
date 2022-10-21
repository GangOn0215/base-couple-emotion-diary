const express = require('express');
const router = express.Router();

//authChecker: jwt 체크하는 middleware
const authChecker = require('../middleware/auth');
const controller = require('../controllers/account');

router.get('/', (req, res) => {
  console.log('account');
});

router.post('/row', authChecker, controller.row);
router.post('/login', controller.login);
router.post('/checkLogin', authChecker, controller.checkLogin);
router.post('/register', controller.register);
router.post('/overlap', controller.overlap);

module.exports = router;
