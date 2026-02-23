export default async function getUserFav({ token }) {
    const res = await fetch(`${process.env.API}/wishlist`, {
        headers: {
            token: `${token}`
        },
    });
    if (!res.ok) {
        throw new Error("error in fetch api response");
    }
    return res.json();
};