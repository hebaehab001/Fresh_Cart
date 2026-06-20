"use server";
import { getUserCart } from "@/APIs/cart.api";
import { CartApiResponse } from "@/types/api.types";
import { getMyToken } from "@/utilities/token";

export async function getUserCartAction():Promise<CartApiResponse> {
  const token = await getMyToken();
  if (!token) {
    return {
      success: false,
      message: "Authentication required. Please login first.",
    };
  }
  return await getUserCart({ token });
}