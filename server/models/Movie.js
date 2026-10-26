
const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    genre: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    poster: {
      type: String,
      default: ""
    },
    duration: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", movieSchema);
