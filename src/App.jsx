import { useState } from "react";
import { ALL_MOVIES } from "./data/movies";
import MovieItem from "./components/movie-item";
import MovieForm from "./components/movie-form";

// Set to one of ALL_MOVIES.items to test edit mode, or null for add mode
const currentMovie = null;

export default function App() {
  const movies = ALL_MOVIES.items;
  const [isFormOpen, setIsFormOpen] = useState(false);

  function handleSave(movieData) {
    console.log(movieData);
    setIsFormOpen(false);
  }

  function handleCancel() {
    console.log("cancel");
    setIsFormOpen(false);
  }

  return (
    <div className="app">
      <button className="btn btn-primary" onClick={() => setIsFormOpen(true)}>
        Add Movie
      </button>

      {isFormOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={handleCancel}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <MovieForm
              movie={currentMovie}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          </div>
        </div>
      )}

      <div className="movie-list">
        {movies.map((movie) => (
          <MovieItem key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
