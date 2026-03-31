export default async function getBrandById(id) {
    const res = await fetch(`${process.env.API}/brands/${id}`, {
        next: { revalidate: 3600 },
    });
    if (!res.ok) {
        throw new Error("error in fetch api response");
    }
    return res.json();
};

