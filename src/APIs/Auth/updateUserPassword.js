export default async function updateUserPassword(data) {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_POST_RESETPASSWORD, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result.message || "Failed to update password from the server.",
      };
    }

    return {
      success: true,
      message: result.message || "Password updated successfully.",
    };
    
  } catch (error) {
    return {
      success: false,
      message: "Network error. Please check your connection.",
    };
  }
}