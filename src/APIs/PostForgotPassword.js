export default async function PostForgotPassword(data) {
    const res = await fetch(process.env.NEXT_PUBLIC_POST_ForgotPassword, {
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