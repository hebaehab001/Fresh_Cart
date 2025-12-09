export default async function PostSignup(data) {
    const res = await fetch(process.env.NEXT_PUBLIC_POST_SIGNUP, {
        method: 'POST', 
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