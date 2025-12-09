export default async function PostOnlinePayemnt({ productsId, token, data }) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_ONLINEPAYMENT}${productsId}?url=http://localhost:3000`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            token: `${token}`
        },
        body: JSON.stringify(data)
    });
    if (!res.ok) {
        throw new Error("error in fetch api response");
    }
    return res.json();
};