const mongoose = require('mongoose');

const { Schema } = mongoose;
const Image = require('./Image');

const DiarySchema = Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
    mood: {
      /* 
        1: very bad
        2: bad
        3: soso
        4: good
        5: very good
      */
      type: Number,
      default: 1,
    },
    img: { Image },
    lv: {
      /* 
        0: default (public)
        1: follow (proteted)
        2: girfrend (proteted)
        3: private
      */
      type: Number,
      default: 0,
    },
    diaryDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

module.exports = DiarySchema;
