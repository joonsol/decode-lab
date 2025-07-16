const mongoose = require("mongoose");

const workSchema = new mongoose.Schema(
  {
    number: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    desc1: {
      type: String,
      required: true,
    },
    desc2: {
      type: String,
      required: true,
    },
    client: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    thumb: {
      type: [String],
      trim: true,
    },
    link: {
      type: String,
      required: true,
    },

  }, {
  timestamps: true, // ✅ createdAt, updatedAt 자동 생성
}
);

const Work = mongoose.model("Work", workSchema);

module.exports = Work;