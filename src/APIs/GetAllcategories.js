export default async function getAllCategories() {
    const res = await fetch(`${process.env.API}/categories`, {
        cache:'force-cache'
    });
    if (!res.ok) {
        throw new Error("error in fetch api response");
    }
    return res.json();
};