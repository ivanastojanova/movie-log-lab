import { useCallback } from "react";
import { Link, useParams } from "react-router";
import { getMovie } from "../services/movies-service";
import { useFetch } from "../hooks/useFetch";
import Image from "../components/movie-item/poster/Image";
import Star from "../components/movie-item/poster/Star";
import NowPlaying from "../components/movie-item/poster/NowPlaying";
import Title from "../components/movie-item/details/Title";
import Genres from "../components/movie-item/details/Genres";
import Description from "../components/movie-item/details/Description";
import Skeleton from "../components/skeleton";

function MovieDetailSkeleton() {
  return (
    <div className="w-full max-w-4xl px-6 flex flex-col sm:flex-row gap-8 bg-white rounded-xl shadow-md p-6">
      <div className="w-full sm:w-80 h-[28rem] flex-shrink-0 rounded-lg overflow-hidden">
        <Skeleton variant="image" />
      </div>
      <div className="flex flex-col gap-4 flex-1">
        <Skeleton variant="title" className="w-1/2 h-8" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
        <Skeleton variant="line" />
        <Skeleton variant="line" />
        <Skeleton variant="line" className="w-2/3" />
      </div>
    </div>
  );
}

export default function MovieDetailPage() {
  const { id } = useParams();
  const fetchMovie = useCallback(() => getMovie(id), [id]);
  const { data: movie, isLoading } = useFetch(fetchMovie, null);

  return (
    <div className="app">
      <div className="w-full max-w-4xl px-6">
        <Link to="/" className="text-blue-500 hover:underline">
          ← Back to movies
        </Link>
      </div>

      {isLoading ? (
        <MovieDetailSkeleton />
      ) : !movie ? (
        <p className="text-gray-600">Movie not found.</p>
      ) : (
        <div className="w-full max-w-4xl px-6 flex flex-col sm:flex-row gap-8 bg-white rounded-xl shadow-md p-6">
          <div className="relative w-full sm:w-80 h-[28rem] flex-shrink-0 overflow-hidden rounded-lg">
            <Image image={movie.image} name={movie.name} />
            <Star rating={movie.rating} />
            {movie.inTheaters && <NowPlaying />}
          </div>
          <div className="flex flex-col gap-4 flex-1">
            <Title name={movie.name} />
            <Genres genres={movie.genres} />
            <Description description={movie.description} />
          </div>
        </div>
      )}
    </div>
  );
}
