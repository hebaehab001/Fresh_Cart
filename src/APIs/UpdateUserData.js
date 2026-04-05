export default async function UpdateUserData({token,data} ) {
    const res = await fetch(process.env.NEXT_PUBLIC_PUT_USERDATA, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            token: `${token}`,
        },
        body: JSON.stringify(data)
    });
    if (!res.ok) {
        throw new Error("error in fetch api response");
    }
    return res.json();
};