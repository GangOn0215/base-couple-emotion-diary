const private = require('./private.json');
const bcrypt = require("bcryptjs");

// 1. mongoose 모듈 가져오기
const mongoose = require('mongoose');

if(process.env.NODE_ENV === 'develop') {
  mongoose.connect(`mongodb+srv://${private.id}:${private.pw}@cluster0.oiy1b.mongodb.net/couple_diary?retryWrites=true&w=majority`);
} else {
  mongoose.connect(process.env.MONGODB_URI);
}

const db = mongoose.connection;

// 4. 연결 실패
db.on('error', function(){
  console.log('Connection Failed!');
});

// 5. 연결 성공
db.once('open', function() {
  console.log('Connected!');
});

// 만약 없다면 새로 생성해줌
const memberSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  pw: {
    type: String,
    required: true
  },
  email: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  age: {
    type: Number,
  },
  profileImg: {
    type: String,
  },
  lv: {
    type: Number,
    default: 0,
  },
  authLV: {
    type: Number,
    default: 0
  }
  
}, {timestamps: true});

const Member = mongoose.model('member', memberSchema);

module.exports = Member;