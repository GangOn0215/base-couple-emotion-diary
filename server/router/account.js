const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const saltRounds = 10; // salt 돌리는 횟수

//middleware
const authChecker = require('../middleware/auth');

let privateJSON = null;
let JWT_KEY = null;

if (process.env.NODE_ENV === 'develop') {
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
};

router.get('/', (req, res) => {
  console.log('account');
});

router.post('/login', async (req, res) => {
  // loading animation을 위한 delay
  const wait = (timeToDelay) => new Promise((resolve) => setTimeout(resolve, timeToDelay));
  await wait(2000);

  const data = await Member.findOne({ id: req.body.id });

  // User not found.
  if (!data) {
    res.json({
      status: 'login_fail',
      data: {},
      error: 'ERROR_ID',
    });

    return;
  }

  const result = await bcrypt.compare(req.body.pw, data.pw);

  // password is not match
  if (!result) {
    res.json({
      status: 'login_fail',
      data: {},
      error: 'ERROR_PW',
    });

    return;
  }

  // get user data - don't get password
  const resData = await Member.findOne({ id: req.body.id }).select('-pw');

  const payload = {
    user: {
      id: resData._id,
    },
  };

  // jwt 넣어주기
  jwt.sign(payload, JWT_KEY, { expiresIn: '1h' }, (err, token) => {
    if (err) throw err;
    res.cookie('x_auth', token, { httpOnly: false });
    res.send({ status: 'login_success', token: token, data: resData });
  });
});

//authChecker: jwt 체크하는 middleware
router.post('/checkLogin', authChecker, async (req, res) => {
  const getUser = await row_id(req.user.id);
  if (getUser) {
    res.send({
      isAuth: true,
    });
  }
});

router.post('/row', authChecker, async (req, res) => {
  const getUser = await row_id(req.user.id);

  if (getUser) {
    res.send({
      isAuth: true,
      member: getUser,
    });
  }
});

router.post('/register', async (req, res) => {
  const reqBody = req.body;
  console.log(reqBody);

  const checkOverlapData = await Member.findOne({ id: req.body.id });

  // 이미 데이터가 존재함
  if (checkOverlapData) {
    res.json({
      status: 'register_fail',
      error: '아이디가 존재 합니다.',
    });

    return;
  }

  const hashPassword = bcrypt.hashSync(req.body.pw, saltRounds);

  const newMember = new Member({
    id: reqBody.id,
    pw: hashPassword,
    email: reqBody.email,
    phoneNumber: reqBody.phoneNumber,
    age: reqBody.age,
  });

  const result = await newMember.save();

  const wait = (timeToDelay) => new Promise((resolve) => setTimeout(resolve, timeToDelay));
  await wait(2000);

  const pkId = result._id;

  const payload = {
    user: {
      id: pkId,
    },
  };

  // jwt 넣어주기
  jwt.sign(payload, JWT_KEY, { expiresIn: '1h' }, (err, token) => {
    if (err) throw err;

    // res.send({ break: 'break' });
    res.send({ status: 'register_success', token: token, memberId: reqBody.id });
  });
});

module.exports = router;
