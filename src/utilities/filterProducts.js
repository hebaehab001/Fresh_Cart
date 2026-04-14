export function filterProducts(products, search, selectedCategory) {
    if (!products) return [];

    return products.filter((product) => {
        const matchesSearch = product.title
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchesCategory = selectedCategory
            ? product.category.name === selectedCategory
            : true;

        return matchesSearch && matchesCategory;
    });
}