import {
  ApiParams,
  WishListApiResponse,
} from "@/types/api.types";

export async function deleteWishlist({
  id,
  token
}:ApiParams): Promise<WishListApiResponse> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_FAV}/${id}`, {
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
        message: result.message || "Failed to remove this from favourite",
      };
    }

    return {
      success: true,
      data: result.data,
      message:
        result.message || "Product removed successfully from your wishlist",
    };
  } catch (error) {
    return {
      success: false,
      message: "Network error. Please check your connection.",
    };
  }
}

export async function getUserWishlist(
  {token}: ApiParams
): Promise<WishListApiResponse> {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_FAV, {
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
      count: result.count,
    };
  } catch (error) {
    return {
      success: false,
      message: "Network error. Please check your connection.",
    };
  }
}

export async function postWishlist({
  id,
  token
}:ApiParams): Promise<WishListApiResponse> {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_FAV, {
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
        message: result.message || "Failed to add this in favourite",
      };
    }

    return {
      success: true,
      data: result.data,
      message: result.message || "Product added successfully to your wishlist",
    };
  } catch (error) {
    return {
      success: false,
      message: "Network error. Please check your connection.",
    };
  }
}