import Skeleton from "../skeleton";

export default function MovieItemSkeleton() {
  return (
    <div className="movie-item">
      <div className="movie-item-image-wrapper">
        <Skeleton variant="image" className="rounded-none" />
      </div>
      <div className="movie-item-content-wrapper">
        <div className="movie-item-title-wrapper">
          <Skeleton variant="title" className="w-3/4" />
          <div className="flex gap-1">
            <Skeleton className="h-5 w-14 rounded-full" />
            <Skeleton className="h-5 w-14 rounded-full" />
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-2">
          <Skeleton variant="line" />
          <Skeleton variant="line" />
          <Skeleton variant="line" className="w-2/3" />
        </div>

        <div className="flex items-center justify-between gap-3 mt-auto pt-2">
          <Skeleton variant="text-sm" className="w-20" />
          <div className="flex gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-4" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
