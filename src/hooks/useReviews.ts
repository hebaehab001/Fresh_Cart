// hooks/useReviews.ts
"use client";
import { useState, useEffect, useCallback } from "react";
import { toastError, toastSuccess } from "@/lib/toast";
import { getProductReviews } from "@/APIs/reviews.api";
import { getUserIdAction } from "@/Actions/UserActions/getUserIdAction";
import { createReviewAction } from "@/Actions/ReviewActions/createReviewAction";
import { updateReviewAction } from "@/Actions/ReviewActions/updateReviewAction";
import { deleteReviewAction } from "@/Actions/ReviewActions/deleteReviewAction";
import {
  Review,
  CreateReviewData,
  UpdateReviewData,
} from "@/types/review.type";

export function useReviews(productId: string, initialReviews: Review[]) {
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [loading, setLoading] = useState(false);
  const [actionState, setActionState] = useState<
    "add" | "update" | "delete" | null
  >(null);

  useEffect(() => {
    getUserIdAction().then(setCurrentUserId);
  }, []);

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getProductReviews(productId);
      if (response.data) setReviews(response.data);
    } catch {
      toastError("Couldn't load reviews");
    } finally {
      setLoading(false);
    }
  }, [productId]);

  async function handleAddReview(values: CreateReviewData) {
    setActionState("add");
    try {
      const response = await createReviewAction(productId, values);
      if (response?.success) {
        toastSuccess(response.message || "Review added successfully");
        await fetchReviews();
      } else {
        toastError(response?.message);
      }
    } catch {
      toastError();
    } finally {
      setActionState(null);
    }
  }

  async function handleUpdateReview(
    reviewId: string,
    values: UpdateReviewData,
  ) {
    setActionState("update");
    try {
      const response = await updateReviewAction(reviewId, values);
      if (response?.success) {
        toastSuccess(response.message || "Review updated successfully");
        await fetchReviews();
      } else {
        toastError(response?.message);
      }
    } catch {
      toastError();
    } finally {
      setActionState(null);
    }
  }

  async function handleDeleteReview(reviewId: string) {
    setActionState("delete");
    try {
      const response = await deleteReviewAction(reviewId);
      if (response?.success) {
        toastSuccess(response.message || "Review deleted");
        await fetchReviews();
      } else {
        toastError(response?.message);
      }
    } catch {
      toastError();
    } finally {
      setActionState(null);
    }
  }

  const userReview = reviews.find((r) => r.user._id === currentUserId);

  return {
    currentUserId,
    reviews,
    loading,
    userReview,
    actionState,
    handleAddReview,
    handleUpdateReview,
    handleDeleteReview,
  };
}
