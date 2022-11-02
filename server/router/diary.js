const express = require('express');
const router = express.Router();

//middleware
const authChecker = require('../middleware/auth');
const controller = require('../controllers/diary');

router.get('/');

router.get('/query', controller.query);

router.get('/row', controller.row);
router.post('/lists', authChecker, controller.lists);
router.post('/insert', authChecker, controller.insert);
router.post('/update', authChecker, controller.update);
router.post('/delete', authChecker, controller.deleteOne);

module.exports = router;
