import React from 'react'
import { Star, StarHalf } from "lucide-react";
import { useMemo } from "react";

export default function StarRating({ rating, maxStars = 5, iconClass = "w-6 h-6" }: { rating: number, maxStars: number, iconClass: string }) {
const roundedRating = useMemo(() => Math.round(rating * 2) / 2, [rating]);
const stars = useMemo(() => {
    const starElements = [];
    for (let i = 1; i <= maxStars; i++) {
        const starValue = i;
        if (starValue <= roundedRating) {
            starElements.push(
                <Star
                    key={i}
                    className={`${iconClass} fill-yellow-400 text-yellow-400`}
                />,
            );
        } else if (starValue - 0.5 === roundedRating) {
            starElements.push(
                <div key={i} className="relative">
                    <StarHalf
                        className={`${iconClass} fill-yellow-400 text-yellow-400 absolute`}
                    />
                    <Star className={`${iconClass} fill-gray-300 text-gray-300`} />
                </div>,
            );
        } else {
            starElements.push(
                <Star
                    key={i}
                    className={`${iconClass} fill-gray-300 text-gray-300`}
                />,
            );
        }
    }
    return starElements;
}, [roundedRating, maxStars, iconClass]);

// Ensure the rating is between 0 and maxStars
if (rating < 0 || rating > maxStars) {
    // You might want to return an error state or default stars here
    return <div className="text-red-500">Invalid Rating</div>;
}

return <div className="flex space-x-0.5">{stars}</div>;
}