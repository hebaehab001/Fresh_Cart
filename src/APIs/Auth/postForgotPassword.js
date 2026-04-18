export default async function PostForgotPassword(data) {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_POST_FORGETPASSWORD, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result.message || "Failed to send verification code from the server.",
      };
    }

    return {
      success: true,
      message: result.message || "Verification code sent successfully",
    };

  } catch (error) {
    return {
      success: false,
      message: "Network error. Please check your connection.",
    };
  }
}