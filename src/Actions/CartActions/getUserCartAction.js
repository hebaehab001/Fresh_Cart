"use server";
import getUserCart from "@/APIs/Cart/getUserCart";
import { getMyToken } from "@/utilities/token";

export async function getUserCartAction() {
  const token = await getMyToken();
  if (!token) {
    return {
      success: false,
      message: "Authentication required. Please login first.",
    };
  }
  return await getUserCart({ token: token });
}