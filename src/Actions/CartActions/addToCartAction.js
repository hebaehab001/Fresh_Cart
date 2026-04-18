"use server";
import postCart from "@/APIs/Cart/postCart";
import { getMyToken } from "@/utilities/token";

export async function addToCartAction(id) {
  const token = await getMyToken();
  if (!token) {
    return {
      success: false,
      message: "Authentication required. Please login first.",
    };
  }
  return await postCart({ productId: id, token: token });
}