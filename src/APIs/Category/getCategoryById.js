export default async function getCategoriesById(id) {
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