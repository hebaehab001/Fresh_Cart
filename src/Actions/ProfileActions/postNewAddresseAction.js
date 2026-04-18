"use server";
import postNewAddresse from "@/APIs/Addresses/postNewAddresse";
import { getMyToken } from "@/utilities/token";

export async function postNewAddresseAction(data) {
  const token = await getMyToken();
  if (!token) {
    return {
      success: false,
      message: "Authentication required. Please login first.",
    };
  }
  return await postNewAddresse({ token: token, data: data });
}