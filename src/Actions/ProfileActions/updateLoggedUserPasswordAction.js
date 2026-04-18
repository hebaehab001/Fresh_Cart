"use server";
import updateLoggedUserPassword from "@/APIs/Profile/updateLoggedUserPassword";
import { getMyToken } from "@/utilities/token";

export async function updateLoggedUserPasswordAction(data) {
  const token = await getMyToken();
  if (!token) {
    return {
      success: false,
      message: "Authentication required. Please login first.",
    };
  }
  return await updateLoggedUserPassword({ token: token, data: data });
}