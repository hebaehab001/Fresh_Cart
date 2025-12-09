export default async function DeleteCart({ productId, token }) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_CART}/${productId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            token: `${token}`
        }
    });
    if (!res.ok) {
        throw new Error("error in fetch api response");
    }
    return res.json();
};