export default async function updateCart({ productId, token, count }) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_CART}/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify({ count: count }),
    });
    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result.message || "Failed to update product in cart",
      };
    }

    return {
      data: result.data,
      success: true,
      numOfCartItems: result.numOfCartItems,
      cartId: result.cartId,
      message: result.message || "product updated successfully from your cart",
    };

  } catch (error) {
    return {
      success: false,
      message: "Network error. Please check your connection.",
    };
  }
}