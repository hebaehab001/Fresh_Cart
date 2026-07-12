"use server";
import { updateReview } from "@/APIs/reviews.api";
import { ReviewActionResponse, UpdateReviewData } from "@/types/review.type";
import { getMyToken } from "@/utilities/token";

export async function updateReviewAction(
  id: string,
  data: UpdateReviewData,
): Promise<ReviewActionResponse> {
  const token = await getMyToken();
  if (!token) {
    return {
      success: false,
      message: "Authentication required. Please login first.",
    };
  }
  return await updateReview( id,data,token );
}