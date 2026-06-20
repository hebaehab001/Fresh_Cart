"use server";
import getOrderUser from "@/APIs/orderPayment.api";
import { ApiDataResponse } from "@/types/api.types";
import { OrdersResponse } from "@/types/orders.type";
import { getMyToken } from "@/utilities/token";
import { jwtDecode } from "jwt-decode";

export async function getUserOrdertAction(): Promise<ApiDataResponse<OrdersResponse>> {
  const token = await getMyToken();
  if (!token) {
    return {
      success: false,
      message: "Authentication required. Please login first.",
    };
  }
  const id: string = jwtDecode(token);
  return await getOrderUser({ id });
}