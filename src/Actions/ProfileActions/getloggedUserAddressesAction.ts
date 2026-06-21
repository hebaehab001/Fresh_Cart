"use server";
import { getloggedUserAddresses } from "@/APIs/addresses.api";
import { AddressesApiResponse} from "@/types/api.types";
import { getMyToken } from "@/utilities/token";

export async function getloggedUserAddressesAction(): Promise<AddressesApiResponse> {
  const token = await getMyToken();
  if (!token) {
    return {
      success: false,
      message: "Authentication required. Please login first.",
    };
  }
  return await getloggedUserAddresses({ token });
}