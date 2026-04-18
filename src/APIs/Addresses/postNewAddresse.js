export default async function postNewAddresse({ token, data }) {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_GET_LOGGED_USER_ADDRESSES, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result.message || "Failed to update address from the server.",
      };
    }

    return {
      success: true,
      message: result.message || "Address updated successfully.",
    };

  } catch (error) {
    return {
      success: false,
      message: "Network error. Please check your connection.",
    };
  }
}