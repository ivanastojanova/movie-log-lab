import { useState } from "react";
import {
  getMovies,
  createMovie,
  updateMovie,
  rateMovie,
  clearRatings,
  removeMovie,
} from "../services/movies-service";
import { useFetch } from "../hooks/useFetch";
import MovieItem from "../components/movie-item";
import MovieItemSkeleton from "../components/movie-item/Skeleton";
import MovieForm from "../components/movie-form";
import Modal from "../components/modal";

const SKELETON_COUNT = 8;

export default function HomePage() {
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

  async function handleRate(movieId, newRating) {
    try {
      const updated = await rateMovie(movieId, newRating);
      setMovies((prev) => prev.map((m) => (m.id === updated.id ? updated : m)));
    } catch (e) {
      console.error("Failed to rate movie:", e);
    }
  }

  async function handleClearRatings() {
    try {
      const updated = await clearRatings();
      setMovies(updated);
    } catch (e) {
      console.error("Failed to clear ratings:", e);
    }
  }

  async function handleRemove(movie) {
    try {
      await removeMovie(movie.id);
      setMovies((prev) => prev.filter((m) => m.id !== movie.id));
    } catch (e) {
      console.error("Failed to remove movie:", e);
    }
  }

  async function handleSave(formData) {
    try {
      if (selectedMovie) {
        const updated = await updateMovie(selectedMovie.id, formData);
        setMovies((prev) => prev.map((m) => (m.id === updated.id ? updated : m)));
      } else {
        const created = await createMovie(formData);
        setMovies((prev) => [...prev, created]);
      }
      setIsFormOpen(false);
    } catch (e) {
      console.error("Failed to save movie:", e);
    }
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
