"use server";
import deleteAllCarts from "@/APIs/Cart/deleteAllCarts";
import { getMyToken } from "@/utilities/token";

export async function clearAllCartsAction() {
  const token = await getMyToken();
  if (!token) {
    return {
      success: false,
      message: "Authentication required. Please login first.",
    };
  }
  return await deleteAllCarts({ token: token });
}
