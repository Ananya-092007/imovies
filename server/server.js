
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const Movie = require("./models/Movie");
const Booking = require("./models/Booking");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.send("Welcome to the IMovies backend API!");
});

// API status route
app.get("/api/status", (req, res) => {
  res.json({
    success: true,
    message: "IMovies backend connected successfully!"
  });
});


// PASTE THE NEW ROUTE BELOW THIS LINE
app.get("/api/movies", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch movies"
    });
  }
});

app.post("/api/movies", async (req, res) => {
  try {
    const movie = await Movie.create(req.body);

    res.status(201).json({
      message: "Movie added successfully!",
      movie: movie
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to add movie",
      error: error.message
    });
  }
});

app.post("/api/bookings", async (req, res) => {
  try {
    const { movieId, showtime, seats } = req.body;
    if (
  !mongoose.isValidObjectId(movieId) ||
  typeof showtime !== "string" ||
  !showtime.trim() ||
  !Number.isInteger(seats) ||
  seats < 1 ||
  seats > 6
) {
  return res.status(400).json({
    message: "Please provide a valid movie, showtime, and seat count."
  });
}


    const movie = await Movie.findById(movieId);

    if (!movie) {
      return res.status(404).json({
        message: "Movie not found"
      });
    }

    const booking = await Booking.create({
      movie: movie._id,
      movieTitle: movie.title,
      showtime,
      seats,
      totalAmount: seats * movie.price
    });

    res.status(201).json({
      message: "Booking saved successfully!",
      booking
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to save booking",
      error: error.message
    });
  }
});



// Connect to MongoDB and start server
async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected successfully!");

    app.listen(PORT, () => {
      console.log(`IMovies server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
  }
}

startServer();
