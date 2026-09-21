export default function MovieItemSkeleton() {
  return (
    <div className="movie-item animate-pulse">
      <div className="movie-item-image-wrapper bg-gray-200" />
      <div className="movie-item-content-wrapper">
        <div className="movie-item-title-wrapper">
          <div className="h-5 bg-gray-200 rounded w-3/4 mb-3" />
          <div className="flex gap-1">
            <div className="h-5 w-14 bg-gray-200 rounded-full" />
            <div className="h-5 w-14 bg-gray-200 rounded-full" />
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-2">
          <div className="h-3 bg-gray-200 rounded w-full" />
          <div className="h-3 bg-gray-200 rounded w-full" />
          <div className="h-3 bg-gray-200 rounded w-2/3" />
        </div>

        <div className="flex items-center justify-between gap-3 mt-auto pt-2">
          <div className="h-3 w-20 bg-gray-200 rounded" />
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-4 w-4 bg-gray-200 rounded" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
