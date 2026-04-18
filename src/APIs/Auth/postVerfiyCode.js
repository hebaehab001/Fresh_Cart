export default async function postVerifyCode(data) {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_POST_VERIFYCODE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ resetCode: data }),
    });
    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result.message || "Failed to verify code from the server.",
      };
    }

    return {
      success: true,
      message: result.message || "Verified successfully",
    };

  } catch (error) {
    return {
      success: false,
      message: "Network error. Please check your connection.",
    };
  }
}