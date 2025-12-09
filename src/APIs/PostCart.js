export default async function PostCart({productId,token}) {
    const res = await fetch(process.env.NEXT_PUBLIC_CART, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
            token: `${token}`
        },
        body: JSON.stringify({ productId: productId })
    });
    if (!res.ok) {
        throw new Error("error in fetch api response");
    }
    return res.json();
};