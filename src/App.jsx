import { useState } from "react";
import { getMovies } from "./services/movies-service";
import { useFetch } from "./hooks/useFetch";
import MovieItem from "./components/movie-item";
import MovieItemSkeleton from "./components/movie-item/Skeleton";
import MovieForm from "./components/movie-form";
import Modal from "./components/modal";

const SKELETON_COUNT = 8;

export default function App() {
  const { data: movies, setData: setMovies, isLoading } = useFetch(getMovies, []);
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
        <Modal onClose={handleCancel}>
          <MovieForm
            movie={selectedMovie}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        </Modal>
      )}

      <div className="movie-list">
        {isLoading
          ? Array.from({ length: SKELETON_COUNT }).map((_, i) => (
              <MovieItemSkeleton key={i} />
            ))
          : movies.map((movie) => (
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
