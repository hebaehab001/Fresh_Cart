"use server";
import getOrderUser from "@/APIs/orderPayment.api";
import { OrderApiResponse } from "@/types/api.types";
import { getMyToken } from "@/utilities/token";
import { jwtDecode } from "jwt-decode";

export async function getUserOrdertAction(): Promise<OrderApiResponse> {
  const token = await getMyToken();
  if (!token) {
    return {
      success: false,
      message: "Authentication required. Please login first.",
    };
  }
  const decoded = jwtDecode<{ id: string }>(token);
  const id = decoded.id;
  
  return await getOrderUser(id);
}