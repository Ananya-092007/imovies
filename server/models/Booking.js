
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true
    },
    movieTitle: {
      type: String,
      required: true
    },
    showtime: {
      type: String,
      required: true
    },
    seats: {
      type: Number,
      required: true,
      min: 1,
      max: 6
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
