"use server";
import { getUserWishlist } from "@/APIs/whishlist.api";
import { WishListApiResponse } from "@/types/api.types";
import { getMyToken } from "@/utilities/token";

export async function getUserWishlistAction(): Promise<WishListApiResponse> {
  const token = await getMyToken();
  if (!token) {
    return {
      success: false,
      message: "Authentication required. Please login first.",
    };
  }
  return await getUserWishlist({ token });
}