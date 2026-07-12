"use server";

import { deleteReview } from "@/APIs/reviews.api";
import { ReviewActionResponse } from "@/types/review.type";
import { getMyToken } from "@/utilities/token";

export async function deleteReviewAction(
  id: string,
): Promise<ReviewActionResponse> {
    const token = await getMyToken();
    if (!token) {
      return {
        success: false,
        message: "Authentication required. Please login first.",
      };
    }
    return await deleteReview(id, token);
};