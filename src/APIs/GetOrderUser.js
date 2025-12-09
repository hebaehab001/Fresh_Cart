export default async function getOrderUser({id}) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_USER_ORDER}${id}`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    if (!res.ok) {
        throw new Error("error in fetch api response");
    }
    return res.json();
};

