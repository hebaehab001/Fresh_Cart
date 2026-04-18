"use server";
import updateUserData from "@/APIs/Profile/updateUserData";
import { getMyToken } from "@/utilities/token";

export async function updateUserInfoAction(data) {
  const token = await getMyToken();
  if (!token) {
    return {
      success: false,
      message: "Authentication required. Please login first.",
    };
  }
  return await updateUserData({ token: token, data: data });
} 