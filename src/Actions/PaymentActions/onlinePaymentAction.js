"use server";
import postOnlinePayment from "@/APIs/Payment/postOnlinePayment";
import { getMyToken } from "@/utilities/token";

export async function onlinePaymentAction(productsId, data) {
  const token = await getMyToken();
  if (!token) {
    return {
      success: false,
      message: "Authentication required. Please login first.",
    };
  }
  return await postOnlinePayment({
    token: token,
    productsId: productsId,
    data: data,
  });
}