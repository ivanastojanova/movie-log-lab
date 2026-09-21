export default function Genres({ genres }) {
  return (
    <div className="movie-item-genres-wrapper">
      {genres.map((genre) => (
        <span key={genre} className="movie-item-genre-tag">
          {genre}
        </span>
      ))}
    </div>
  );
}
