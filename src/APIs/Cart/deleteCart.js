export default async function deleteCart({ productId, token }) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_CART}/${productId}`, {
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
        message: result.message || "Failed to remove this from cart",
      };
    }

    return {
      success: true,
      data: result.data,
      message: result.message || "Product removed successfully from your cart",
    };

  } catch (error) {
    return {
      success: false,
      message: "Network error. Please check your connection.",
    };
  }
}