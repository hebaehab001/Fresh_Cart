export default async function getUserCart({ token }) {
  try {
      const res = await fetch(process.env.NEXT_PUBLIC_CART, {
      headers: {
        token: token,
      },
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
      numOfCartItems: result.numOfCartItems,
      cartId: result.cartId,
    };

  } catch (error) {
    return {
      success: false,
      message: "Network error. Please check your connection.",
    };
  }
}