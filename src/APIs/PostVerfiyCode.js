export default async function PostVerifyCode(data) {
    const res = await fetch(process.env.NEXT_PUBLIC_POST_VERIFYCODE, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "resetCode": data })
    });
    if (!res.ok) {
        throw new Error("error in fetch api response");
    }
    return res.json();
};