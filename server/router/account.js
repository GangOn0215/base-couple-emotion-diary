const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//middleware
const authChecker = require('../middleware/auth');

let privateJSON = null;
let JWT_KEY = null;

if(process.env.NODE_ENV === 'develop') {
  // private json data
  privateJSON = require('../private.json');
  JWT_KEY = privateJSON.jwt.key;
} else {
  JWT_KEY = process.env.JWT_SECURITY_KEY;
}

// Model
const Member = require('../models/Member');
const row_id = async (id) => {
  return await Member.findById(id).select('-pw');

}

router.get('/', (req, res) => {
  console.log('account');
});

router.post('/login', async (req, res) => {
  const data = await Member.findOne({ id: req.body.id });

  // User not found.
  if(!data) {
    res.json({
      success: false,
      data: { },
      error: "ID not found.",
    });

    return;
  }

  const result = await bcrypt.compare(req.body.pw, data.pw);

  // password is not match
  if(!result) {
    res.json({
      success: false,
      data: { },
      error: 'The password is different.'
    });

    return;
  }

  // get user data - don't get password
  const resData = await Member.findOne({ id: req.body.id }).select('-pw');

  const payload = {
    user: {
      id: resData._id,
    }
  }

  // jwt 넣어주기
  jwt.sign(
    payload,
    JWT_KEY,
    { expiresIn: "1h" },
    (err, token) => {
      if(err) throw err;
      res.cookie('x_auth', token, { httpOnly : false });
      res.send({ success: true, token: token, data: resData });
    }
  )

});

//authChecker: jwt 체크하는 middleware
router.post('/checkLogin', authChecker, async(req, res) => {
  const getUser = await row_id(req.user.id);
  console.log(getUser);

  if(getUser) {
    res.send({
      isAuth: true,
      user: getUser
    })
  }
});

router.post('/register', async (req, res) => {
  const reqBody = req.body;
});


module.exports = router;
