const express = require('express');
const router = express.Router();

const routeTodos = require('./todos');
const routeAccount = require('./account');

router.use('/todos', routeTodos);
router.use('/account', routeAccount);

module.exports = router;