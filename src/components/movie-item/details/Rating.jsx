import { useState } from "react";
import { StarIcon as StarSolid } from "@heroicons/react/24/solid";
import { StarIcon as StarOutline } from "@heroicons/react/24/outline";

const MAX_RATING = 5;

export default function Rating({ rating, onRate }) {
  const [hovered, setHovered] = useState(null);
  const activeRating = hovered ?? rating;

  return (
    <div className="movie-item-rating-wrapper">
      <span className="movie-item-rating-text">
        Rating: {rating != null ? rating : "N/A"}
      </span>
      <div className="movie-item-star-icon-wrapper">
        {[...Array(MAX_RATING)].map((_, index) => {
          const value = index + 1;
          const isFilled = activeRating != null && value <= activeRating;
          const Star = isFilled ? StarSolid : StarOutline;
          return (
            <button
              key={index}
              className="movie-item-star-icon-button"
              onClick={() => onRate(value)}
              onMouseEnter={() => setHovered(value)}
              onMouseLeave={() => setHovered(null)}
            >
              <Star className="movie-item-star-icon text-yellow-500" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
