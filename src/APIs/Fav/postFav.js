export default async function postFav({ productId, token }) {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_FAV, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify({ productId: productId }),
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