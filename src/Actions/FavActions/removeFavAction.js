"use server";
import deleteFav from "@/APIs/Fav/deleteFav";
import { getMyToken } from "@/utilities/token";

export async function removeFavAction(id) {
  const token = await getMyToken();
  if (!token) {
    return {
      success: false,
      message: "Authentication required. Please login first.",
    };
  }
  return await deleteFav({ productId: id, token: token });
}