"use server";
import getUserFav from "@/APIs/Fav/getUserFav";
import { getMyToken } from "@/utilities/token";

export async function getUserFavAction() {
  const token = await getMyToken();
  if (!token) {
    return {
      success: false,
      message: "Authentication required. Please login first.",
    };
  }
  return await getUserFav({ token: token });
}