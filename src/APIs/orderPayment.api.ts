import { ShippingAddress } from "@/types/addresses.type";
import {
  ApiDataParams,
  ApiResponse,
  OrderApiResponse,
} from "@/types/api.types";

// Cash Payment
export async function postCashPayment({
  id,
  token,
  data,
}: ApiDataParams<ShippingAddress>): Promise<ApiResponse> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_CASHPAYMENT}/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result.message || "Failed to pay with cash. Please try again.",
      };
    }

    return {
      success: true,
      message: result.message || "payment successful.",
    };
  } catch (error) {
    return {
      success: false,
      message: "Network error. Please check your connection.",
    };
  }
}

// card online payment
export async function postOnlinePayment({
  id,
  token,
  data,
}: ApiDataParams<ShippingAddress>): Promise<ApiResponse> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_ONLINEPAYMENT}/${id}?url=${process.env.NEXTAUTH_URL}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify(data),
      },
    );
    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message:
          result.message ||
          "Failed to pay with online payment. Please try again.",
      };
    }

    return {
      success: true,
      message: result.message || "payment successful.",
      session: result.session,
    };
  } catch (error) {
    return {
      success: false,
      message: "Network error. Please check your connection.",
    };
  }
}

// Get User orders
export default async function getOrderUser(
  id: string,
): Promise<OrderApiResponse> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_USER_ORDER}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result.message || "Failed to fetch data from the server.",
      };
    }

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      message: "Network error. Please check your connection.",
    };
  }
}
