"use server";
import { deleteAddress } from "@/APIs/addresses.api";
import { ApiResponse } from "@/types/api.types";
import { getMyToken } from "@/utilities/token";

export async function removeAddressAction(id:string) : Promise<ApiResponse>{
  const token = await getMyToken();
  if (!token) {
    return {
      success: false,
      message: "Authentication required. Please login first.",
    };
  }
  return await deleteAddress({ id, token });
}