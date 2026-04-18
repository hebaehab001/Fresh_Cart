export default async function deleteAllCarts({ token }) {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_CART, {
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
        message: result.message || "Failed to remove those from cart",
      };
    }

    return {
      success: true,
      message:
        result.message || "All products removed successfully from your cart",
    };

  } catch (error) {
    return {
      success: false,
      message: "Network error. Please check your connection.",
    };
  }
}