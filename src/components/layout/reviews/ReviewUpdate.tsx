"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { updateReviewAction } from "@/Actions/ReviewActions/updateReviewAction";
import { Review, UpdateReviewData } from "@/types/review.type";
import { deleteReviewAction } from "@/Actions/ReviewActions/deleteReviewAction";

interface ReviewUpdateProps {
  review: Review;
  onUpdateComplete?: () => void;
  onReviewDeleted?: () => void;
}

export default function ReviewUpdate({
  review,
  onUpdateComplete,
  onReviewDeleted,
}: ReviewUpdateProps) {
  const [rating, setRating] = useState(review.rating);
  const [reviewText, setReviewText] = useState(review.review);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    if (!reviewText.trim()) {
      toast.error("Please write a review");
      return;
    }

    setLoading(true);

    const updateData: UpdateReviewData = {
      rating,
      review: reviewText,
    };

    const response = await updateReviewAction(review._id, updateData);

    if (response.success) {
      toast.success("Review updated successfully");
      onUpdateComplete?.();
    } else {
      toast.error(response.message || "Failed to update review");
    }

    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    const response = await deleteReviewAction(id);
    if (response.success) {
      toast.success("Review deleted");
      onReviewDeleted?.();
    } else {
      toast.error("Failed to delete review");
    }
  };

  return (
    <form
      onSubmit={handleUpdate}
      className="bg-white p-4 rounded-lg shadow-md w-full"
    >
      <h3 className="text-lg font-bold mb-4">Edit Your Review</h3>
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
        <label className="block text-sm font-medium mb-2">Review</label>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          className="w-full p-2 border rounded-lg focus:outline-none focus:border-sky-500"
          rows={3}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Button
          type="submit"
          disabled={loading}
          className="bg-sky-800 hover:bg-sky-900 text-white w-full"
          variant={undefined}
          size={undefined}
        >
          {loading ? "Saving..." : "Save"}
        </Button>
        <Button
          disabled={loading}
          onClick={() => handleDelete(review._id)}
          variant={undefined}
          size={undefined}
          className=" text-white w-full"
        >
          {loading ? "Deleting..." : "Delete Review"}
        </Button>
      </div>
    </form>
  );
}
