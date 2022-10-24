const mongoose = require('mongoose');
const Diary = require('./Diary');

const { Schema } = mongoose;

const MemberSchema = Schema(
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
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    profileImg: {
      type: String,
    },
    // lv: game lv
    lv: {
      type: Number,
      default: 0,
    },
    // permission
    authLV: {
      type: Number,
      default: 0,
    },
    history: [{ name: { type: String } }],
    lover: Schema.Types.ObjectId,
    diary: [Diary],
    fallowing: [],
    fallow: [],
  },
  { timestamps: true },
);

module.exports = mongoose.model('member', MemberSchema);
