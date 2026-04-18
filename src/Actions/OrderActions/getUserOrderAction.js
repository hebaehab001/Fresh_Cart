"use server";
import getOrderUser from "@/APIs/Profile/getOrderUser";
import { getMyToken } from "@/utilities/token";
import { jwtDecode } from "jwt-decode";

export async function getUserOrdertAction() {
  const token = await getMyToken();
  if (!token) {
    return {
      success: false,
      message: "Authentication required. Please login first.",
    };
  }
  const { id } = jwtDecode(token);
  return await getOrderUser({ id: id });
}