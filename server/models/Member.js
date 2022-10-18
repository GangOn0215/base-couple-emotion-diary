const mongoose = require('mongoose');

const { Schema } = mongoose;

const Member = Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    pw: {
      type: String,
      required: true,
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
      default: 0,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model('member', Member);
