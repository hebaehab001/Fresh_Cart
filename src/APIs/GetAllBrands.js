export default async function getAllBrands() {
    const res = await fetch(`${process.env.API}/brands`, {
        cache: 'force-cache'
    });
    if (!res.ok) {
        throw new Error("error in fetch api response");
    }
    return res.json();
};