export default async function updateUserData({ token, data }) {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_PUT_USERDATA, {
      method: "PUT",
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
        message:
          result.message || "Failed to update user data from the server.",
      };
    }

    return {
      success: true,
      message: result.message || "User data updated successfully.",
    };

  } catch (error) {
    return {
      success: false,
      message: "Network error. Please check your connection.",
    };
  }
}