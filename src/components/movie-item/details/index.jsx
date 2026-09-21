import { Link } from "react-router";
import Title from "./Title";
import Genres from "./Genres";
import Description from "./Description";
import Rating from "./Rating";

export default function MovieDetails({ movieId, name, genres, description, rating, onRate }) {
  return (
    <div className="movie-item-content-wrapper">
      <div className="movie-item-title-wrapper">
        <Link to={`/movie/${movieId}`} className="hover:underline">
          <Title name={name} />
        </Link>
        <Genres genres={genres} />
      </div>

      <Description description={description} />

      <Rating rating={rating} onRate={onRate} />
    </div>
  );
}
