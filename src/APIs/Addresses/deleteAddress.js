export default async function deleteAddress({ addressId, token }) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_GET_LOGGED_USER_ADDRESSES}/${addressId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      },
    );
    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result.message || "Failed to remove this from addresses",
      };
    }

    return {
      success: true,
      message:
        result.message || "Address removed successfully from your addresses",
    };
    
  } catch (error) {
    return {
      success: false,
      message: "Network error. Please check your connection.",
    };
  }
}