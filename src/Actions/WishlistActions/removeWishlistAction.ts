"use server";
import { deleteWishlist } from "@/APIs/whishlist.api";
import { WishListApiResponse } from "@/types/api.types";
import { getMyToken } from "@/utilities/token";

export async function removeWishlistAction(id: string): Promise<WishListApiResponse> {
  const token = await getMyToken();
  if (!token) {
    return {
      success: false,
      message: "Authentication required. Please login first.",
    };
  }
  return await deleteWishlist({ id, token });
}