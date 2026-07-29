"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Review, UpdateReviewData } from "@/types/review.type";
import LoadingBtn from "../Buttons/LoadingBtn";
import { toastError } from "@/lib/toast";

interface ReviewUpdateProps {
  review: Review;
  isSaving: boolean;
  isDeleting: boolean;
  onSave: (values: UpdateReviewData) => void;
  onDelete: () => void;
}

export default function ReviewUpdate({ review, isSaving, isDeleting, onSave, onDelete }: ReviewUpdateProps) {
  const [rating, setRating] = useState(review.rating);
  const [reviewText, setReviewText] = useState(review.review);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (rating === 0) {
      toastError("Please select a rating");
      return;
    }
    if (!reviewText.trim()) {
      toastError("Please write a review");
      return;
    }
    onSave({ rating, review: reviewText });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-lg shadow-md w-full"
    >
      <h3 className="text-lg font-bold mb-4">Edit Your Review</h3>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Rating</label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Button
              key={star}
              type="button"
              size="icon-lg"
              onClick={() => setRating(star)}
              className={`text-3xl bg-transparent hover:bg-transparent ${
                star <= rating ? "text-yellow-400" : "text-gray-300"
              }  hover:text-yellow-300`}
            >
              ★
            </Button>
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
        <LoadingBtn
          isSubmitting={isSaving}
          type="submit"
          variant="primary"
          size="lg"
          className="w-full text-lg"
          loadingTitle="Saving..."
          title="Save"
        />
        <LoadingBtn
          isSubmitting={isDeleting}
          type="button"
          variant="default"
          onClick={onDelete}
          size="lg"
          className="text-lg w-full bg-transparent border border-red-500 text-red-500 hover:bg-red-500! hover:text-white"
          loadingTitle="Deleting..."
          title="Delete Review"
        />
      </div>
    </form>
  );
}
