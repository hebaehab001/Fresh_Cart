export default async function getUserCart({ token }) {
    const res = await fetch(`${process.env.API}/cart`, {
        headers: {
            token: `${token}`
        },
    });
    if (!res.ok) {
        throw new Error("error in fetch api response");
    }
    return   res.json();
};