"use server";
import getloggedUserAddresses from "@/APIs/Addresses/getloggedUserAddresses";
import { getMyToken } from "@/utilities/token";

export async function getloggedUserAddressesAction() {
  const token = await getMyToken();
  if (!token) {
    return {
      success: false,
      message: "Authentication required. Please login first.",
    };
  }
  return await getloggedUserAddresses(token);
}