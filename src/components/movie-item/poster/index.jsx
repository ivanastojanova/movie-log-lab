import Image from "./Image";
import Star from "./Star";
import NowPlaying from "./NowPlaying";

export default function MoviePoster({ image, name, rating, inTheaters }) {
  return (
    <div className="movie-item-image-wrapper">
      
      <Image image={image} name={name} />

      <Star rating={rating} />

      {inTheaters && (
        <NowPlaying />
      )}
    </div>
  );
}
