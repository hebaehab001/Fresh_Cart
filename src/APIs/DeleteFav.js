export default async function DeleteFav({ productId, token }) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_FAV}/${productId}`, {
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