const jwt = require('jsonwebtoken');

let privateJSON = null;
let JWT_KEY = null;

if (process.env.NODE_ENV === 'develop') {
  // private json data
  privateJSON = require('../private.json');
  JWT_KEY = privateJSON.jwt.key;
} else {
  JWT_KEY = process.env.JWT_SECURITY_KEY;
}

const authChecker = (req, res, next) => {
  const token = req.headers.authorization;

  jwt.verify(token, JWT_KEY, async (err, decoded) => {
    if (err) return res.json({ isAuth: false, message: 'token decode 실패' });

    req.user = decoded.user;
    req.status = 'success';

    next();
  });
};

module.exports = authChecker;
