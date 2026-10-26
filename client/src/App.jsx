import BackendStatus from "./BackendStatus";
import { useEffect, useMemo, useState } from "react";
import "./App.css";
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000";


const movies = [
  {
    id: 1,
    title: "Interstellar",
    genre: "Sci-Fi",
    rating: "8.7",
    duration: "2h 49m",
    year: 2026,
    description: "A journey beyond the stars, where love and time collide.",
    gradient: "poster-space",
    symbol: "✦",
    label: "BEYOND THE UNKNOWN",
  },
  {
    id: 2,
    title: "The Dark Knight",
    genre: "Action",
    rating: "9.0",
    duration: "2h 32m",
    year: 2026,
    description: "When darkness rises, a city needs its hero.",
    gradient: "poster-dark",
    symbol: "🦇",
    label: "RISE OF THE DARK",
  },
  {
    id: 3,
    title: "Dune",
    genre: "Sci-Fi",
    rating: "8.5",
    duration: "2h 46m",
    year: 2026,
    description: "Destiny awaits across an ocean of endless sand.",
    gradient: "poster-dune",
    symbol: "☀",
    label: "THE DESERT AWAKENS",
  },
  {
    id: 4,
    title: "La La Land",
    genre: "Romance",
    rating: "8.0",
    duration: "2h 08m",
    year: 2026,
    description: "Two dreamers discover the magic of a city.",
    gradient: "poster-romance",
    symbol: "♫",
    label: "DREAM A LITTLE BIGGER",
  },
  {
    id: 5,
    title: "The Conjuring",
    genre: "Horror",
    rating: "7.5",
    duration: "1h 52m",
    year: 2026,
    description: "Some doors should never be opened.",
    gradient: "poster-horror",
    symbol: "◉",
    label: "FEAR LIVES HERE",
  },
  {
    id: 6,
    title: "Spider-Verse",
    genre: "Animation",
    rating: "8.6",
    duration: "2h 20m",
    year: 2026,
    description: "One hero. Infinite worlds. Endless possibilities.",
    gradient: "poster-spider",
    symbol: "✳",
    label: "ENTER ANOTHER DIMENSION",
  },
];

const genres = ["All", "Action", "Sci-Fi", "Romance", "Horror", "Animation"];
const showtimes = ["10:30 AM", "1:45 PM", "5:15 PM", "8:30 PM"];
function formatDuration(duration) {
  if (typeof duration !== "number") return duration;

  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  return `${hours}h ${String(minutes).padStart(2, "0")}m`;
}
function App() {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showtime, setShowtime] = useState("5:15 PM");
  const [seats, setSeats] = useState(2);
  const [bookingMessage, setBookingMessage] = useState("");
  
  const [backendMovies, setBackendMovies] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/movies`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }
        return response.json();
      })
      .then((data) => {
        setBackendMovies(data);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  }, []);


  const filteredMovies = useMemo(() => {
    return backendMovies.filter((movie) => {
      const matchesSearch = movie.title
        .toLowerCase()
        .includes(search.trim().toLowerCase());

      const matchesGenre = genre === "All" || movie.genre === genre;

      return matchesSearch && matchesGenre;
    });
  }, [search, genre, backendMovies]);

  function openBooking(movie) {
    setSelectedMovie(movie);
    setShowtime("5:15 PM");
    setSeats(2);
    setBookingMessage("");
  }

  


async function confirmDemoBooking(event) {
  event.preventDefault();

  setBookingMessage("Saving your booking...");

  try {
    const response = await fetch(`${API_BASE_URL}/api/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        movieId: selectedMovie._id,
        showtime: showtime,
        seats: seats
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to save booking");
    }

    setBookingMessage(
      `Booking saved successfully! ${selectedMovie.title} — ${seats} seat(s) at ${showtime}. Total: ₹${data.booking.totalAmount}.`
    );
  } catch (error) {
   setBookingMessage(
  `Booking failed: ${error.message}. Please try again.`
);
  }
}


  return (
    <div className="app-shell">
       <BackendStatus />
      <header className="navbar">
        <a className="brand" href="#home" aria-label="IMovies home">
          <span className="brand-icon">▶</span>
          <span>i<span className="brand-highlight">Movies</span></span>
        </a>

        <nav className="nav-links">
          <a className="active-link" href="#home">Home</a>
          <a href="#movies">Movies</a>
          <a href="#about">About</a>
        </nav>

        <a className="nav-cta" href="#movies">Book a ticket <span>↗</span></a>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <span className="eyebrow"><span className="live-dot" /> YOUR NEXT MOVIE NIGHT STARTS HERE</span>
            <h1>Stories worth<br />the <span>big screen.</span></h1>
            <p>
              Find your next favourite film, pick your perfect seats,
              and make every movie night unforgettable.
            </p>
            <div className="hero-actions">
              <a href="#movies" className="primary-button">Explore movies <span>→</span></a>
              <a href="#about" className="secondary-button">Discover IMovies</a>
            </div>
            <div className="hero-stats">
              <div><strong>6+</strong><span>Featured films</span></div>
              <div><strong>4</strong><span>Daily showtimes</span></div>
              <div><strong>100%</strong><span>Movie magic</span></div>
            </div>
          </div>

          <div className="hero-art" aria-label="Featured movie artwork">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="hero-glow" />
            <div className="hero-ticket">
              <span className="ticket-top">IMOVIES ORIGINAL</span>
              <span className="ticket-star">✦</span>
              <strong>YOUR<br />STORY<br /><span>BEGINS</span></strong>
              <span className="ticket-bottom">ONE SCREEN. INFINITE WORLDS.</span>
            </div>
            <div className="floating-note">✦ Your seat is waiting</div>
          </div>
        </section>

        <section className="movies-section" id="movies">
          <div className="section-heading">
            <div>
              <span className="eyebrow">HANDPICKED FOR YOU</span>
              <h2>Now showing<span>.</span></h2>
              <p className="section-description">Big stories. Great seats. Your kind of cinema.</p>
            </div>
            <div className="movie-count">{filteredMovies.length} FILMS</div>
          </div>

          <div className="movie-controls">
            <label className="search-box">
              <span>⌕</span>
              <input
                type="search"
                placeholder="Search movies..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                aria-label="Search movies"
              />
              <kbd>/</kbd>
            </label>

            <div className="genre-filters" aria-label="Filter movies by genre">
              {genres.map((item) => (
                <button
                  key={item}
                  className={`genre-button ${genre === item ? "genre-active" : ""}`}
                  onClick={() => setGenre(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          {filteredMovies.length > 0 ? (
            <div className="movie-grid">
              {filteredMovies.map((movie, index) => (
                <article className="movie-card" key={movie._id || movie.id}>
                  <div className={`movie-poster ${movie.gradient || "poster-space"}`}>
                    <div className="poster-topline">
                      <span>IMOVIES</span>
                      <span className="poster-rating">★ {movie.rating || "New"}</span>
                    </div>
                    <div className="poster-art">
                      <span className="poster-symbol">{movie.symbol || "✦"}</span>
                      <span className="poster-label">{movie.label || movie.title.toUpperCase()}</span>
                    </div>
                    <span className="poster-number">0{index + 1}</span>
                    <span className="poster-bottom-label">A CINEMATIC EXPERIENCE</span>
                  </div>

                  <div className="movie-info">
                    <div className="movie-title-row">
                      <h3>{movie.title}</h3>
                      <span className="rating">★ {movie.rating}</span>
                    </div>
                    <p className="movie-meta">{movie.genre} <span>•</span> {formatDuration(movie.duration)}</p>
                    <p className="movie-description">{movie.description}</p>
                    <div className="movie-card-footer">
                      <span className="movie-price">From <strong>₹{movie.price ?? 199}</strong></span>
                      <button className="book-button" onClick={() => openBooking(movie)}>
                        Book now <span>→</span>
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <span>⌕</span>
              <h3>No movies found</h3>
              <p>Try another title or choose a different genre.</p>
              <button
                className="primary-button"
                onClick={() => { setSearch(""); setGenre("All"); }}
              >
                Clear filters
              </button>
            </div>
          )}
        </section>

        <section className="experience-section" id="about">
          <div className="experience-symbol">✦</div>
          <div>
            <span className="eyebrow">THE IMOVIES EXPERIENCE</span>
            <h2>Less planning.<br /><span>More popcorn.</span></h2>
            <p>Discover films, explore showtimes, and make your next cinema outing count.</p>
          </div>
          <a className="primary-button" href="#movies">Find your movie <span>→</span></a>
        </section>
      </main>

      <footer className="footer">
        <a className="brand" href="#home"><span className="brand-icon">▶</span><span>i<span className="brand-highlight">Movies</span></span></a>
        <p>Made for the love of cinema.</p>
        <span>© {new Date().getFullYear()} IMovies</span>
      </footer>

      {selectedMovie && (
        <div className="modal-backdrop" onClick={() => setSelectedMovie(null)}>
          <section
            className="booking-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="booking-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button className="modal-close" onClick={() => setSelectedMovie(null)} aria-label="Close booking window">×</button>
            <span className="eyebrow">YOUR MOVIE NIGHT</span>
            <h2 id="booking-title">Book your <span>seats.</span></h2>
            <p className="modal-movie-name">{selectedMovie.title}</p>
            <p className="movie-meta">
  {selectedMovie.genre} <span>•</span>{" "}
  {formatDuration(selectedMovie.duration)}
</p>

            <form onSubmit={confirmDemoBooking}>
              <label className="form-label">Choose a showtime</label>
              <div className="showtime-options">
                {showtimes.map((time) => (
                  <button
                    type="button"
                    key={time}
                    className={`showtime-button ${showtime === time ? "showtime-active" : ""}`}
                    onClick={() => { setShowtime(time); setBookingMessage(""); }}
                  >
                    {time}
                  </button>
                ))}
              </div>

              <label className="form-label" htmlFor="seat-count">Number of seats</label>
              <select
                id="seat-count"
                value={seats}
                onChange={(event) => { setSeats(Number(event.target.value)); setBookingMessage(""); }}
              >
                {[1, 2, 3, 4, 5, 6].map((count) => (
                  <option key={count} value={count}>{count} {count === 1 ? "seat" : "seats"}</option>
                ))}
              </select>

              <div className="booking-total">
                <span>Total amount</span>
                <strong>₹{seats * (selectedMovie.price ?? 199)}</strong>
              </div>

            <button
  type="submit"
  className="primary-button confirm-button"
  disabled={
    bookingMessage === "Saving your booking..." ||
    bookingMessage.startsWith("Booking saved successfully!")
  }
>
  {bookingMessage === "Saving your booking..."
    ? "Saving..."
    : bookingMessage.startsWith("Booking saved successfully!")
      ? "Booking Confirmed ✓"
      : "Continue →"}
</button>
              {bookingMessage && <p className="booking-notice" role="status">{bookingMessage}</p>}
              <p className="demo-note">Your booking will be saved when confirmation succeeds.</p>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}

export default App;
