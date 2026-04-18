export default async function getloggedUserAddresses(token) {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_GET_LOGGED_USER_ADDRESSES, {
      method: "GET",
      headers: {
        token: token,
      },
      cache: "no-store",
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
      data: result.data || [],
    };

  } catch (error) {
    return {
      success: false,
      message: "Network error. Please check your connection.",
    };
  }
}