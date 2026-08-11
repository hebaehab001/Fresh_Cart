"use server";
import { updateUserData } from "@/APIs/auth.api";
import { ApiResponse } from "@/types/api.types";
import { UpdateUserData } from "@/types/profile.type";
import { getMyToken } from "@/utilities/token";

export async function updateUserInfoAction(data: UpdateUserData): Promise<ApiResponse> {
  const token = await getMyToken();
  if (!token) {
    return {
      success: false,
      message: "Authentication required. Please login first.",
    };
  }
  return await updateUserData({ token, data });
} 