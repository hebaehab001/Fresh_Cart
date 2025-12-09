export default async function getProductById(id) {
    const res = await fetch(`${process.env.API}/products/${id}`, {
        next: { revalidate: 3600 },
    });
    if (!res.ok) {
        throw new Error("error in fetch api response");
    }
    return res.json();
};

