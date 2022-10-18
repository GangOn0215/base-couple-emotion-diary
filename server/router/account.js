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
const connect = require('../models');
const Member = require('../models/Member');

// mongoDB 연결
connect();

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
  const getUser = await Member.findOne({ id: req.user.id }).select('-pw');

  if (getUser) {
    res.send({
      isAuth: true,
    });
  }
});

router.post('/overlap', async (req, res) => {
  let getUser = null;

  switch (req.body.type) {
    case 'id':
      getUser = await Member.findOne({ id: req.body.data });
      break;
    case 'email':
      getUser = await Member.findOne({ email: req.body.data });
      break;
    case 'phoneNumber':
      getUser = await Member.findOne({ phoneNumber: req.body.data });
    default:
      break;
  }

  // user 데이터가 존재
  if (getUser) {
    return res.send({
      overlap: true,
    });
  }

  return res.send({
    overlap: false,
  });
});

router.post('/row', authChecker, async (req, res) => {
  const getUser = await Member.findOne({ id: req.body.id });

  if (getUser) {
    return res.send({
      isAuth: true,
      member: getUser,
    });
  }

  res.send({
    isAuth: false,
  });
});

router.post('/register', async (req, res) => {
  const reqBody = req.body;
  const overlap = {};

  overlap.id = await Member.findOne({ id: reqBody.id });
  overlap.email = await Member.findOne({ email: reqBody.email });
  overlap.phoneNumber = await Member.findOne({ phoneNumber: reqBody.phoneNumber });

  // 이미 데이터가 존재함
  if (overlap.id || overlap.email || overlap.phoneNumber) {
    let overlapType = '';

    if (overlap.id) overlapType = 'id';
    if (overlap.email) overlapType = 'email';
    if (overlap.phoneNumber) overlapType = 'phoneNumber';

    res.json({
      status: 'register_fail',
      error: `${overlapType} 존재 합니다.`,
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
