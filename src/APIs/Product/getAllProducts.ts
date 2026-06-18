import { ApiResponse } from "@/types/common";
import { AllProducts } from "@/types/product";

export default async function getAllProducts() {
  try {
      const res = await fetch(process.env.NEXT_PUBLIC_PRODUCTS, {
      next: { revalidate: 600 },
    });
    const result = await res.json() as ApiResponse<AllProducts>;

    if (!res.ok) {
      return {
        success: false,
        message: result.message || "Failed to fetch data from the server.",
      };
    }

    return {
      success: true,
      data: result.data ,
    };

  } catch (error) {
    return {
      success: false,
      message: "Network error. Please check your connection.",
    };
  }
}