"use server";
import { postCashPayment } from "@/APIs/orderPayment.api";
import { ApiResponse } from "@/types/api.types";
import { ShippingAddress } from "@/types/profile.type";
import { getMyToken } from "@/utilities/token";

export async function cashPaymentAction(id:string, data:ShippingAddress): Promise<ApiResponse> {
  const token = await getMyToken();
  if (!token) {
    return {
      success: false,
      message: "Authentication required. Please login first.",
    };
  }
  return await postCashPayment({
    token,
    id,
    data,
  });
}