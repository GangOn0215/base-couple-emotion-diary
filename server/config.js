const saltRounds = 10; // salt 돌리는 횟수

let privateJSON = null;
let JWT_KEY = null;

if (process.env.NODE_ENV === 'develop') {
  // private json data
  privateJSON = require('./private.json');
  JWT_KEY = privateJSON.jwt.key;
} else {
  JWT_KEY = process.env.JWT_SECURITY_KEY;
}

module.exports = {
  saltRounds,
  JWT_KEY,
};
