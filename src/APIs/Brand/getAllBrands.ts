import { Brand } from "@/types/brands.type";
import { ApiResponse } from "@/types/common.type";

export default async function getAllBrands() {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_BRANDS, {
      cache: "force-cache",
    });
    const result = (await res.json()) as ApiResponse<Brand[]>;

    if (!res.ok) {
      return {
        success: false,
        message: result.message || "Failed to fetch data from the server.",
      };
    }

    return {
      success: true,
      data: result.data,
    };
  } catch (error) {
    return {
      success: false,
      message: "Network error. Please check your connection.",
    };
  }
}