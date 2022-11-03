const jwt = require('jsonwebtoken');
// initialize config
const config = require('../config');

const authChecker = (req, res, next) => {
  let token = '';
  
  if (!req.headers.authorization && !req.cookies.x_auth) {
    return res.json({ isAuth: false, message: 'token not found' });
  }

  if (req.headers.authorization) {
    token = req.headers.authorization;
  } else {
    token = req.cookies.x_auth;
  }

  jwt.verify(token, config.JWT_KEY, async (err, decoded) => {
    if (err) return res.json({ isAuth: false, message: 'token decode 실패' });

    req.user = decoded.user;
    req.status = 'success';

    next();
  });
};

module.exports = authChecker;
