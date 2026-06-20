"use server";
import { postOnlinePayment } from "@/APIs/orderPayment.api";
import { ShippingAddress } from "@/types/addresses.type";
import { ApiResponse } from "@/types/api.types";
import { getMyToken } from "@/utilities/token";

export async function onlinePaymentAction(id:string, data:ShippingAddress): Promise<ApiResponse> {
  const token = await getMyToken();
  if (!token) {
    return {
      success: false,
      message: "Authentication required. Please login first.",
    };
  }
  return await postOnlinePayment({
    token,
    id,
    data,
  });
}