"use server";

import { getMyToken } from "@/utilities/token";
import { jwtDecode } from "jwt-decode";

export async function getUserIdAction(): Promise<string | null> {
  try {
    const token = await getMyToken();
    if (!token) return null;

    const decoded = jwtDecode<{ id: string }>(token);
    return decoded.id;
  } catch (error) {
    console.error("Error getting user ID:", error);
    return null;
  }
}
