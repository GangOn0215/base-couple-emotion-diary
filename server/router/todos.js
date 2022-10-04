const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    console.log('breka');
});
  
router.get('/list', function (req, res) {  
  // temp data
  res.json([
    {
      author: '1',
      title: '2',
      content: '3',
      emotion: 1,
      createAt: 1663678808338,
      updateAt: null,
      id: 2,
    },
    {
      author: '2',
      title: '2',
      content: '2',
      emotion: 1,
      createAt: 1663678530732,
      updateAt: 1663678805633,
      id: 1,
    },
  ]);
});

module.exports = router;