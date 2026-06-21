import { CategoryApiResponse, SpecificCategoryApiResponse} from "@/types/api.types";

// Get All Categories
export  async function getAllCategories(): Promise<CategoryApiResponse> {
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
  id: string,
): Promise<SpecificCategoryApiResponse> {
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
