export default async function postSignup(data) {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_POST_SIGNUP, {
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
        message:
          result.message || "Failed to register.",
      };
    }

    return {
      success: true,
      message: result.message || "Registered successfully",
    };
    
  } catch (error) {
    return {
      success: false,
      message: "Network error. Please check your connection.",
    };
  }
}