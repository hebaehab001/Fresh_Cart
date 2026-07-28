"use client";

import { useState } from "react";
import { CreateReviewData} from "@/types/review.type";
import { Button } from "@/components/ui/button";
import LoadingBtn from "../Buttons/LoadingBtn";
import { toastError } from "@/lib/toast";

interface ReviewFormProps {
  isSubmitting: boolean;
  onSubmit: (values: CreateReviewData) => void;
}

export default function ReviewForm({ isSubmitting, onSubmit }: ReviewFormProps) {
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>("");


  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (rating === 0) {
      toastError("Please select a rating");
      return;
    }
    if (!review.trim()) {
      toastError("Please write a review");
      return;
    }
    onSubmit({ review, rating });
    setRating(0);
    setReview("");
  }
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
        <label className="block text-sm font-medium mb-2">Comment</label>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Share your thoughts..."
          className="w-full p-2 border rounded-lg focus:outline-none focus:border-sky-500"
          rows={4}
        />
      </div>
      <LoadingBtn
        isSubmitting={isSubmitting}
        type="submit"
        variant="primary"
        size="lg"
        className="w-full text-lg"
        loadingTitle="Submitting..."
        title="Submit Review"
      />
    </form>
  );
}
