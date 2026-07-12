"use client";

import { useState } from "react";
import { CreateReviewData, Review } from "@/types/review.type";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { createReviewAction } from "@/Actions/ReviewActions/createReviewAction";

interface ReviewFormProps {
  id: string;
  onReviewAdded?: () => void;
}

export default function ReviewForm({ id, onReviewAdded }: ReviewFormProps) {
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    if (!review.trim()) {
      toast.error("Please write a review");
      return;
    }

    setLoading(true);

    const reviewData: CreateReviewData = {
      review,
      rating,
    };

    // Call server action
    const response = await createReviewAction(id, reviewData);

    if (response.success) {
      toast.success(response.message || "Review added successfully");
      setRating(0);
      setReview("");
      onReviewAdded?.();
    } else {
      toast.error(response.message || "Failed to add review");
    }

    setLoading(false);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-lg shadow-md w-full"
    >
      <h3 className="text-lg font-bold mb-4">Add Your Review</h3>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Rating</label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className={`text-3xl transition ${
                star <= rating ? "text-yellow-400" : "text-gray-300"
              } cursor-pointer hover:text-yellow-300`}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Comment</label>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Share your thoughts..."
          className="w-full p-2 border rounded-lg focus:outline-none focus:border-sky-500"
          rows={4}
        />
      </div>

      <Button
        type="submit"
        disabled={loading}
        className="bg-sky-800 hover:bg-sky-900 text-white w-full"
        variant={undefined}
        size={undefined}
      >
        {loading ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
  );
}
