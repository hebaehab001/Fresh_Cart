export default async function UpdateCart({ productId, token ,count}) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_CART}/${productId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            token: `${token}`,
        },
        body: JSON.stringify({ count: count })
    });
    if (!res.ok) {
        throw new Error("error in fetch api response");
    }
    return res.json();
};