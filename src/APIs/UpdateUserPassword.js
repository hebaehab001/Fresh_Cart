export default async function UpdateUserPassword(data) {
    const res = await fetch(process.env.NEXT_PUBLIC_POST_RESETPASSWORD, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    if (!res.ok) {
        throw new Error("error in fetch api response");
    }
    return res.json();
};