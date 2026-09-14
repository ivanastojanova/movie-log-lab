import Rating from "./Rating";

export default function MovieDetails({ name, genres, description, rating, onRate }) {
  return (
    <div className="movie-item-content-wrapper">
      <div className="movie-item-title-wrapper">
        <h2 className="movie-item-title">{name}</h2>
        <div className="movie-item-genres-wrapper">
          {genres.map((genre) => (
            <span key={genre} className="movie-item-genre-tag">
              {genre}
            </span>
          ))}
        </div>
      </div>

      <div className="movie-item-description-wrapper">
        <p className="movie-item-description">{description}</p>
      </div>

      <Rating rating={rating} onRate={onRate} />
    </div>
  );
}
