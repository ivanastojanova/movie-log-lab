import { ALL_MOVIES } from "./data/movies";

import { StarIcon } from "@heroicons/react/24/solid";

export default function App() {
  const movies = ALL_MOVIES.items;

  return (
    <div className="app">
      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-item">
            <div className="movie-item-image-wrapper">
              {movie.image ? (
                <img
                  src={movie.image}
                  alt={movie.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full bg-gray-200 text-gray-400 text-lg font-medium">
                  No image
                </div>
              )}

              {/* Rating badge overlaid on the poster */}
              <div className="absolute top-2 right-2 flex items-center justify-center">
                <div className="relative">
                  <StarIcon
                    className={`h-14 w-14 drop-shadow-md ${
                      movie.rating != null ? "text-yellow-500" : "text-gray-500"
                    }`}
                  />
                  <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-base">
                    {movie.rating != null ? movie.rating : "-"}
                  </span>
                </div>
              </div>

              {/* Now Playing badge */}
              {movie.inTheaters && (
                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded-full shadow">
                  Now Playing
                </div>
              )}
            </div>

            <div className="movie-item-content-wrapper">
              <div className="movie-item-title-wrapper">
                <h2 className="movie-item-title">{movie.name}</h2>
                <div className="movie-item-genres-wrapper">
                  {movie.genres.map((genre) => (
                    <span key={genre} className="movie-item-genre-tag">
                      {genre}
                    </span>
                  ))}
                </div>
              </div>

              <div className="movie-item-description-wrapper">
                <p className="movie-item-description">{movie.description}</p>
              </div>

              <div className="movie-item-rating-wrapper">
                <span className="movie-item-rating-text">
                  Rating: {movie.rating != null ? movie.rating : "N/A"}
                </span>
                <div className="movie-item-star-icon-wrapper">
                  {movie.rating != null &&
                    [...Array(Math.round(movie.rating))].map((_, index) => (
                      <StarIcon
                        key={index}
                        className="movie-item-star-icon text-yellow-500"
                      />
                    ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
