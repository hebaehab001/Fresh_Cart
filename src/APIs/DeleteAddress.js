export default async function DeleteAddress({ addressId, token }) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_GET_LOGGED_USER_ADDRESSES}/${addressId}`, {
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