export default async function getUserFav({ token }) {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_FAV, {
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
      count: result.count,
    };
    
  } catch (error) {
    return {
      success: false,
      message: "Network error. Please check your connection.",
    };
  }
}