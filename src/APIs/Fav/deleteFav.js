export default async function deleteFav({ productId, token }) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_FAV}/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    });
    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result.message || "Failed to remove this from favourite",
      };
    }

    return {
      success: true,
      data: result.data,
      message:
        result.message || "Product removed successfully from your wishlist",
    };

  } catch (error) {
    return {
      success: false,
      message: "Network error. Please check your connection.",
    };
  }
}