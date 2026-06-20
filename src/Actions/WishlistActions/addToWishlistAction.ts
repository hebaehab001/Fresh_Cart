"use server";
import { postWishlist } from "@/APIs/whishlist.api";
import { ApiParams, ApiResponse } from "@/types/api.types";
import { getMyToken } from "@/utilities/token";

export async function addToWishlistAction(
  id: string,
): Promise<ApiParams | ApiResponse> {
  const token = await getMyToken();
  if (!token) {
    return {
      success: false,
      message: "Authentication required. Please login first.",
    };
  }
  return await postWishlist({ id, token });
}