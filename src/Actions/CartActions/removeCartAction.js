"use server";
import deleteCart from "@/APIs/Cart/deleteCart";
import { getMyToken } from "@/utilities/token";

export async function removeCartAction(id) {
  const token = await getMyToken();
  if (!token) {
    return {
      success: false,
      message: "Authentication required. Please login first.",
    };
  }
  return await deleteCart({ productId: id, token: token });
}