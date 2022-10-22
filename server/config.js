const saltRounds = 10; // salt 돌리는 횟수

let privateJSON = null;
let JWT_KEY = process.env.JWT_SECURITY_KEY;
let mongodbConnectURL = process.env.MONGODB_URI;

if (process.env.NODE_ENV === 'development') {
  // private json data
  privateJSON = require('./private.json');
  JWT_KEY = privateJSON.jwt.key;
  mongodbConnectURL = `mongodb+srv://${privateJSON.mongodb.id}:${privateJSON.mongodb.pw}@cluster0.oiy1b.mongodb.net/couple_diary?retryWrites=true&w=majority`;
}

module.exports = {
  saltRounds,
  JWT_KEY,
  mongodbConnectURL,
};
