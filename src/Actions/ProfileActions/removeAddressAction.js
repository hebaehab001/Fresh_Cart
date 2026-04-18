"use server";
import deleteAddress from "@/APIs/Addresses/deleteAddress";
import { getMyToken } from "@/utilities/token";

export async function removeAddressAction(id) {
  const token = await getMyToken();
  if (!token) {
    return {
      success: false,
      message: "Authentication required. Please login first.",
    };
  }
  return await deleteAddress({ addressId: id, token: token });
}