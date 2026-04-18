"use server";
import postFav from "@/APIs/Fav/postFav";
import { getMyToken } from "@/utilities/token";

export async function addToFavAction(id) {
  const token = await getMyToken();
    if (!token) {
        return {
            success: false,
            message: "Authentication required. Please login first.",
        };
    }
  return await postFav({ productId: id, token: token });
}