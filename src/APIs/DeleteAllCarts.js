export default async function DeleteAllCarts({ token }) {
    const res = await fetch(process.env.NEXT_PUBLIC_CART, {
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