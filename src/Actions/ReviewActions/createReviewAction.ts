"use server";
import { createReview } from "@/APIs/reviews.api";
import { CreateReviewData, ReviewActionResponse } from "@/types/review.type";
import { getMyToken } from "@/utilities/token";

export async function createReviewAction(
  id: string,
  data: CreateReviewData,
): Promise<ReviewActionResponse> {
  const token = await getMyToken();
  if (!token) {
    return {
      success: false,
      message: "Authentication required. Please login first.",
    };
  }
  
  return await createReview( id,data,token );
}