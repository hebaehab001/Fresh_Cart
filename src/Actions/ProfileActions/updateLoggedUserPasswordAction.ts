"use server";
import { updateLoggedUserPassword } from "@/APIs/auth.api";
import { ApiResponse } from "@/types/api.types";
import { UpdatePasswordData } from "@/types/auth.type";
import { getMyToken } from "@/utilities/token";

export async function updateLoggedUserPasswordAction(data: UpdatePasswordData): Promise<ApiResponse> {
  const token = await getMyToken();
  if (!token) {
    return {
      success: false,
      message: "Authentication required. Please login first.",
    };
  }
  return await updateLoggedUserPassword({token,data });
}