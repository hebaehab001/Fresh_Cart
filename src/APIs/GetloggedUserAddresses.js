export default async function getloggedUserAddresses(token) {
    const res = await fetch(process.env.NEXT_PUBLIC_GET_LOGGED_USER_ADDRESSES, {
        method: "GET",
        headers: {
            token: token,
        },
        cache: "no-store",
    });
    if (!res.ok) {
        throw new Error("error in fetch api response");
    }
    return res.json();
};