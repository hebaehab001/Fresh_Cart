import { CategoryResponse } from "@/types/categories.type";
import { ApiDataResponse, ApiParams} from "@/types/api.types";

// Get All Categories
export  async function getAllCategories():Promise<ApiDataResponse<CategoryResponse>> {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_CATEGORIES, {
      cache: "force-cache",
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

// Get Specifc Category Details
export  async function getCategoriesById(
  id: ApiParams
): Promise<ApiDataResponse<CategoryResponse>> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_CATEGORIES}/${id}`, {
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
