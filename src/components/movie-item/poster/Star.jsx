import { StarIcon } from "@heroicons/react/24/solid";

export default function Star({ rating }) {
    return (
              <div className="absolute top-2 right-2 flex items-center justify-center">
        <div className="relative">
          <StarIcon
            className={`h-14 w-14 drop-shadow-md ${
              rating != null ? "text-yellow-500" : "text-gray-500"
            }`}
          />
          <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-base">
            {rating != null ? rating : "-"}
          </span>
        </div>
      </div>
    )}