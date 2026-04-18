"use server";
import updateCart from "@/APIs/Cart/updateCart";
import { getMyToken } from "@/utilities/token";

export async function updateCartAction(id, count) {
  const token = await getMyToken();
    if (!token) {
        return {
            success: false,
            message: "Authentication required. Please login first.",
        };
    }
  return await updateCart({ productId: id, token: token, count: count });
}