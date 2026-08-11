"use server";
import { postNewAddress } from "@/APIs/addresses.api";
import { ShippingAddress } from "@/types/profile.type";
import { getMyToken } from "@/utilities/token";

export async function postNewAddresseAction(data: ShippingAddress) {
  const token = await getMyToken();
  if (!token) {
    return {
      success: false,
      message: "Authentication required. Please login first.",
    };
  }
  return await postNewAddress({ token,data });
}