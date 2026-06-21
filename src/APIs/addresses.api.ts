import {ShippingAddress } from "@/types/addresses.type";
import {
  ApiDataParams,
  ApiResponse,
  ApiParams,
  AddressesApiResponse,
} from "@/types/api.types";

// Add new Address
export async function postNewAddress({
  token,
  data,
}: ApiDataParams<ShippingAddress>): Promise<ApiResponse> {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_GET_LOGGED_USER_ADDRESSES, {
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
        message: result.message || "Failed to update address from the server.",
      };
    }

    return {
      success: true,
      message: result.message || "Address updated successfully.",
    };
  } catch (error) {
    return {
      success: false,
      message: "Network error. Please check your connection.",
    };
  }
}

// Get User Addresses
export async function getloggedUserAddresses({
  token,
}: ApiParams): Promise<AddressesApiResponse> {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_GET_LOGGED_USER_ADDRESSES, {
      method: "GET",
      headers: {
        token: token,
      },
      cache: "no-store",
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
      data: result.data || [],
    };
  } catch (error) {
    return {
      success: false,
      message: "Network error. Please check your connection.",
    };
  }
}

// Delete User Address
export async function deleteAddress({
  id,
  token
}: ApiParams): Promise<ApiResponse> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_GET_LOGGED_USER_ADDRESSES}/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      },
    );
    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result.message || "Failed to remove this from addresses",
      };
    }

    return {
      success: true,
      message:
        result.message || "Address removed successfully from your addresses",
    };
  } catch (error) {
    return {
      success: false,
      message: "Network error. Please check your connection.",
    };
  }
}
