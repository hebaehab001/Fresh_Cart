import {ProductApiResponse, SpecificProductApiResponse} from "@/types/api.types";

// Gel ALL Products
export async function getAllProducts(): Promise<ProductApiResponse> {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_PRODUCTS, {
      next: { revalidate: 600 },
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
    };
  } catch (error) {
    return {
      success: false,
      message: "Network error. Please check your connection.",
    };
  }
}

// Get Specifc product Detail
export async function getProductById(id: string): Promise<SpecificProductApiResponse> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_PRODUCTS}/${id}`, {
      next: { revalidate: 3600 },
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
    };
  } catch (error) {
    return {
      success: false,
      message: "Network error. Please check your connection.",
    };
  }
}