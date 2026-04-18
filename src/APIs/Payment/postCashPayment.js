export default async function postCashPayment({ productsId, token, data }) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_CASHPAYMENT}/${productsId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
        body: JSON.stringify(data),
      },
    );
    const result = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: result.message || "Failed to pay with cash. Please try again.",
      };
    }

    return {
      success: true,
      message: result.message || "payment successful.",
    };

  } catch (error) {
    return {
      success: false,
      message: "Network error. Please check your connection.",
    };
  }
}