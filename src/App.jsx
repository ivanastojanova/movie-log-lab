import { useState } from "react";
import { ALL_MOVIES } from "./data/movies";
import MovieItem from "./components/movie-item";
import MovieForm from "./components/movie-form";

export default function App() {
  const [movies, setMovies] = useState(ALL_MOVIES.items);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  function handleAdd() {
    setSelectedMovie(null);
    setIsFormOpen(true);
  }

  function handleEdit(movie) {
    setSelectedMovie(movie);
    setIsFormOpen(true);
  }

  function handleRate(movieId, newRating) {
    setMovies((prev) =>
      prev.map((movie) => (movie.id === movieId ? { ...movie, rating: newRating } : movie))
    );
  }

  function handleClearRatings() {
    setMovies((prev) => prev.map((movie) => ({ ...movie, rating: null })));
  }

  function handleRemove(movie) {
    setMovies((prev) => prev.filter((m) => m.id !== movie.id));
  }

  function handleSave({ imageUrl, ...rest }) {
    if (selectedMovie) {
      setMovies((prev) =>
        prev.map((m) =>
          m.id === selectedMovie.id ? { ...m, ...rest, image: imageUrl } : m
        )
      );
    } else {
      setMovies((prev) => [
        ...prev,
        { id: Date.now(), rating: null, image: imageUrl, ...rest },
      ]);
    }
    setIsFormOpen(false);
  }

  function handleCancel() {
    console.log("cancel");
    setIsFormOpen(false);
  }

  const ratedMovies = movies.filter((m) => Number.isFinite(m.rating));
  const averageRating =
    ratedMovies.length > 0
      ? (ratedMovies.reduce((sum, m) => sum + m.rating, 0) / ratedMovies.length).toFixed(1)
      : "N/A";

  return (
    <div className="app">
      <header className="w-full max-w-7xl px-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Movie Ratings</h1>
        <div className="flex gap-6 text-sm text-gray-600">
          <span>
            Total movies: <strong className="text-gray-900">{movies.length}</strong>
          </span>
          <span>
            Average rating: <strong className="text-gray-900">{averageRating}</strong>
          </span>
        </div>
      </header>

      <div className="flex gap-3">
        <button className="btn btn-primary" onClick={handleAdd}>
          Add Movie
        </button>
        <button className="btn btn-secondary" onClick={handleClearRatings}>
          Remove Ratings
        </button>
      </div>

      {isFormOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={handleCancel}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <MovieForm
              movie={selectedMovie}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          </div>
        </div>
      )}

      <div className="movie-list">
        {movies.map((movie) => (
          <MovieItem
            key={movie.id}
            movie={movie}
            onEdit={handleEdit}
            onRemove={handleRemove}
            onRate={handleRate}
          />
        ))}
      </div>
    </div>
  );
}
