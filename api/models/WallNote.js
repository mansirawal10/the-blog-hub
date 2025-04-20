const mongoose = require("mongoose");

const WallNoteSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: "#ffffff",
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("WallNote", WallNoteSchema);
