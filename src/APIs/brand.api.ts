import { BrandApiResponse, SpecificBrandApiResponse} from "@/types/api.types";

// Get All Brands
export  async function getAllBrands():Promise<BrandApiResponse> {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_BRANDS, {
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

// Get Specifc Brand Details
export  async function getBrandById(id: string): Promise<SpecificBrandApiResponse> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BRANDS}/${id}`, {
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