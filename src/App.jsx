import { ALL_MOVIES } from "./data/movies";
import MovieItem from "./components/movie-item";
import MovieForm from "./components/movie-form";

// Set to one of ALL_MOVIES.items to test edit mode, or null for add mode
const currentMovie = null;

export default function App() {
  const movies = ALL_MOVIES.items;

  function handleSave(movieData) {
    console.log(movieData);
  }

  function handleCancel() {
    console.log("cancel");
  }

  return (
    <div className="app">
      <MovieForm movie={currentMovie} onSave={handleSave} onCancel={handleCancel} />
      <div className="movie-list">
        {movies.map((movie) => (
          <MovieItem key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
