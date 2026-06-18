import { Product } from "@/types/product";

export function filterProducts(
  products: Product[] | undefined | null,
  search: string,
  selectedCategory: string | null,
):Product[] {
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