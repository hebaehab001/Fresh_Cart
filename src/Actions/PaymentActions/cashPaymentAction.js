"use server";
import postCashPayment from "@/APIs/Payment/postCashPayment";
import { getMyToken } from "@/utilities/token";

export async function cashPaymentAction(productsId, data) {
  const token = await getMyToken();
  if (!token) {
    return {
      success: false,
      message: "Authentication required. Please login first.",
    };
  }
  return await postCashPayment({
    token: token,
    productsId: productsId,
    data: data,
  });
}