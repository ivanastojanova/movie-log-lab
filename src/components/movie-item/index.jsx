import { Link } from "react-router";
import MoviePoster from "./poster";
import MovieDetails from "./details";

export default function MovieItem({ movie, onEdit, onRemove, onRate }) {
  const { id, name, image, rating, inTheaters, genres, description } = movie;

  return (
    <div className="movie-item">
      <Link to={`/movie/${id}`}>
        <MoviePoster
          image={image}
          name={name}
          rating={rating}
          inTheaters={inTheaters}
        />
      </Link>
      <MovieDetails
        movieId={id}
        name={name}
        genres={genres}
        description={description}
        rating={rating}
        onRate={(newRating) => onRate(movie.id, newRating)}
      />
      <div className="flex gap-2 px-5 pb-5">
        <button className="btn btn-secondary flex-1" onClick={() => onEdit(movie)}>
          Edit
        </button>
        <button
          className="btn flex-1 bg-red-500 hover:bg-red-600 text-white focus:ring-red-400 hover:shadow-md"
          onClick={() => onRemove(movie)}
        >
          Remove
        </button>
      </div>
    </div>
  );
}
