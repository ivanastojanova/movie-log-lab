import MoviePoster from "./poster";
import MovieDetails from "./details";

export default function MovieItem({ movie }) {
  const { name, image, rating, inTheaters, genres, description } = movie;

  return (
    <div className="movie-item">
      <MoviePoster
        image={image}
        name={name}
        rating={rating}
        inTheaters={inTheaters}
      />
      <MovieDetails
        name={name}
        genres={genres}
        description={description}
        rating={rating}
      />
    </div>
  );
}
