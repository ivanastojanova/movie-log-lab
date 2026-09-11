import { StarIcon } from "@heroicons/react/24/solid";

export default function Rating({ rating }) {
  return (
    <div className="movie-item-rating-wrapper">
      <span className="movie-item-rating-text">
        Rating: {rating != null ? rating : "N/A"}
      </span>
      <div className="movie-item-star-icon-wrapper">
        {rating != null &&
          [...Array(Math.round(rating))].map((_, index) => (
            <StarIcon
              key={index}
              className="movie-item-star-icon text-yellow-500"
            />
          ))}
      </div>
    </div>
  );
}
