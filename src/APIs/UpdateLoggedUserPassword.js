export default async function UpdateLoggedUserPassword({data,token}) {
    const res = await fetch(process.env.NEXT_PUBLIC_PUT_LOGGED_USER_PASSWORD, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'token': `${token}`,
        },
        body: JSON.stringify(data)
    });
    if (!res.ok) {
        throw new Error("error in fetch api response");
    }
    return res.json();
};