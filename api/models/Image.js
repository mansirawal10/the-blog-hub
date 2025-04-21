// models/Image.js
const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  data: {
    type: Buffer,
    required: true
  },
  contentType: {
    type: String,
    required: true
  },
  fileName: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Image", imageSchema);