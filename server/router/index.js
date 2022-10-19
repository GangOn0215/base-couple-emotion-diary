const express = require('express');
const router = express.Router();

const routeTodos = require('./todos');
const routeAccount = require('./account');
const routeDiary = require('./diary');

router.use('/todos', routeTodos);
router.use('/account', routeAccount);
router.use('/diary', routeDiary);

module.exports = router;
