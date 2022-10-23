const mongoose = require('mongoose');

const { Schema } = mongoose;

const ImageSchema = Schema(
  {
    originalName: {
      type: String,
    },
    uniqueName: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true },
);

module.exports = ImageSchema;
