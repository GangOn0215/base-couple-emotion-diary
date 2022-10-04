const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

// Model
const Member = require('../models/Member');

router.get('/', (req, res) => {
  console.log('account');
});

router.get('/temp', async (req, res) => {
  const data = await Member.findOne({ id: 'admin' });

  res.json(data);
});

router.post('/login', async (req, res) => {
  console.log(req.body);

  const data = await Member.findOne({ id: req.body.id });

  if(!data) {
    res.json({
      success: false,
      data: { },
      error: "아이디가 없습니다.",
    });
  }
  const result = await bcrypt.compare(req.body.pw, data.pw);

  if (result) {
    const resData = await Member.findOne({ id: req.body.id }).select('-pw');
    // const resData = await Member.findById(req.body.id).select('-pw');

    res.json({
      success: true,
      data: {
        resData
      },
    });
  } else {
    res.json({
      success: false,
      data: { },
    });
  }
});

module.exports = router;
