"use client";
import { useState, useMemo } from "react";
import { filterProducts } from "@/utilities/filterProducts";
import { Product } from "@/types/product.type";

export function useProductFilters(products: Product[]) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredProducts = useMemo(
    () => filterProducts(products, search, selectedCategory),
    [products, search, selectedCategory],
  );

  return {
    search,
    setSearch,
    selectedCategory,
    setSelectedCategory,
    filteredProducts,
  };
}
