"use client";

import { Review } from "@/types/review.type";
import StarRating from "./StarRating";

interface ReviewsListProps {
  reviews: Review[];
  currentUserId: string;
}

export default function ReviewsList({ reviews }: ReviewsListProps) {
  if (reviews.length === 0) {
    return <p className="text-gray-500 text-center">No reviews yet.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  ">
      {reviews.map((review) => (
        <div
          key={review._id}
          className="bg-gray-50 p-4 rounded-lg col-span-1 min-w-0 overflow-hidden"
        >
          <div className="flex gap-4 items-start">
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-sky-900 relative shrink-0">
              <span className="absolute inset-0 flex items-center justify-center text-white">
                {review.user.name.charAt(0).toUpperCase()}
              </span>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center min-w-0">
                <p className="font-medium truncate">{review.user.name}</p>

                <p className="text-sm text-gray-500 shrink-0">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="mt-1">
                <StarRating
                  rating={review.rating}
                  maxStars={5}
                  iconClass="w-4 h-4"
                />
              </div>

              <p className="mt-2 text-sm text-gray-700 w-full wrap-break-word whitespace-normal">
                {review.review}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
