import {ApiDataResponse, ApiParams, ApiResponse, CartApiResponse } from "@/types/api.types";
import { CartResponse } from "@/types/cart.type";

export async function deleteAllCarts({
  token,
}: ApiParams): Promise<ApiResponse> {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_CART, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    });
    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result.message || "Failed to remove those from cart",
      };
    }

    return {
      success: true,
      message:
        result.message || "All products removed successfully from your cart",
    };
  } catch (error) {
    return {
      success: false,
      message: "Network error. Please check your connection.",
    };
  }
}

export async function deleteCart({ id, token }: ApiParams):Promise<ApiDataResponse<CartResponse>> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_CART}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    });
    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result.message || "Failed to remove this from cart",
      };
    }

    return {
      success: true,
      data: result.data,
      message: result.message || "Product removed successfully from your cart",
    };
  } catch (error) {
    return {
      success: false,
      message: "Network error. Please check your connection.",
    };
  }
}

export async function getUserCart({ token }: ApiParams):Promise<CartApiResponse> {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_CART, {
      headers: {
        token: token,
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
      data: result.data,
      numOfCartItems: result.numOfCartItems,
      cartId: result.cartId,
    };
  } catch (error) {
    return {
      success: false,
      message: "Network error. Please check your connection.",
    };
  }
}

export async function postCart({ id, token }: ApiParams):Promise<ApiDataResponse<CartResponse>> {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_CART, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify({ productId: id }),
    });
    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result.message || "Failed to add this in cart",
      };
    }

    return {
      success: true,
      data: result.data,
      message: result.message || "Product added successfully to your cart",
    };
  } catch (error) {
    return {
      success: false,
      message: "Network error. Please check your connection.",
    };
  }
}

export async function updateCart({
  id,
  token,
  count,
}: ApiParams): Promise<CartApiResponse> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_CART}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify({ count: count }),
    });
    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result.message || "Failed to update product in cart",
      };
    }

    return {
      data: result.data,
      success: true,
      numOfCartItems: result.numOfCartItems,
      cartId: result.cartId,
      message: result.message || "product updated successfully from your cart",
    };
  } catch (error) {
    return {
      success: false,
      message: "Network error. Please check your connection.",
    };
  }
}
