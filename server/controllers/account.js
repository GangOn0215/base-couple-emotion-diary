const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// initialize config
const config = require('../config');

// Model
const connect = require('../models');
const Member = require('../models/Member');

// mongoDB 연결
connect();

const overlap = async (req, res) => {
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
};

const row = async (req, res) => {
  const getUser = await Member.findOne({ _id: req.user.id }).select('-pw');

  if (getUser) {
    return res.send({
      isAuth: true,
      member: getUser,
    });
  }

  res.send({
    isAuth: false,
  });
};

const login = async (req, res) => {
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
  jwt.sign(payload, config.JWT_KEY, { expiresIn: '1h' }, (err, token) => {
    if (err) throw err;
    res.cookie('x_auth', token, { httpOnly: false });
    res.send({ status: 'login_success', token: token, member: resData });
  });
};

const checkLogin = async (req, res) => {
  const getUser = await Member.findOne({ id: req.user.id }).select('-pw');

  if (getUser) {
    res.send({
      isAuth: true,
    });
  }
};

const register = async (req, res) => {
  const reqBody = req.body;
  const overlap = {};

  overlap.id = await Member.findOne({ id: reqBody.id });
  overlap.email = await Member.findOne({ email: reqBody.email });
  overlap.phoneNumber = await Member.findOne({ phoneNumber: reqBody.phoneNumber });

  // 이미 데이터가 존재함
  if (overlap.id || overlap.email || overlap.phoneNumber) {
    let overlapType = '';

    if (overlap.id) overlapType = '아이디';
    if (overlap.email) overlapType = '이메일';
    if (overlap.phoneNumber) overlapType = '핸드폰';

    res.json({
      status: 'register_fail',
      error: `${overlapType} 존재 합니다.`,
    });

    return;
  }

  const hashPassword = bcrypt.hashSync(req.body.pw, config.saltRounds);

  const newMember = new Member({
    id: reqBody.id,
    pw: hashPassword,
    email: reqBody.email,
    phoneNumber: reqBody.phoneNumber,
    age: reqBody.age,
    name: reqBody.name,
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
  jwt.sign(payload, config.JWT_KEY, { expiresIn: '1h' }, (err, token) => {
    if (err) throw err;

    // res.send({ break: 'break' });
    res.send({ status: 'register_success', token: token, memberId: reqBody.id });
  });
};

module.exports = {
  login,
  register,
  checkLogin,
  overlap,
  row,
};
