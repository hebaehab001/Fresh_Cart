"use server";
import { getloggedUserAddresses } from "@/APIs/addresses.api";
import { AddressesResponse } from "@/types/addresses.type";
import { ApiDataResponse } from "@/types/api.types";
import { getMyToken } from "@/utilities/token";

export async function getloggedUserAddressesAction(): Promise<ApiDataResponse<AddressesResponse>> {
  const token = await getMyToken();
  if (!token) {
    return {
      success: false,
      message: "Authentication required. Please login first.",
    };
  }
  return await getloggedUserAddresses({token});
}