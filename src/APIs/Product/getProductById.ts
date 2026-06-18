import { ApiResponse } from "@/types/common.type";
import { SpecificProduct } from "@/types/product.type";

export default async function getProductById(id:string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_PRODUCTS}/${id}`, {
      next: { revalidate: 3600 },
    });
    const result = (await res.json()) as ApiResponse<SpecificProduct>;

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