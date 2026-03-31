"use client";
import React from "react";
import { useState, useMemo } from "react";
import ProductsCard from "@/components/layout/Common/ProductsCard/ProductsCard";
import { SearchIcon } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import SidebarFilteration from "./SidebarFilteration";
import NoProducts from "../Common/NoProducts/NoProducts";
export default function ProductSection({ products, brands, categories }) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory = selectedCategory
        ? product.category.name === selectedCategory
        : true;

      return matchesSearch && matchesCategory;
    });
  }, [products, search, selectedCategory]);
  return (
    <div className="grid grid-cols-12 w-[90%] gap-3 ">
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 h-fit col-span-12 lg:col-span-2">
        <SidebarFilteration
          data={categories}
          title="Categories"
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </div>
      <div className="bg-white rounded-xl flex flex-col gap-4 shadow-lg p-6 md:p-8 col-span-12 lg:col-span-10">
        <div className=" flex flex-col md:flex-row justify-between gap-4 md:items-center">
          <h3
            className="text-2xl
                font-bold capitalize
                text-transparent
                bg-clip-text
                bg-linear-to-b
                from-sky-800
                to-sky-900"
          >
            {search || selectedCategory ? `Filtered Results ` : "All Products"}
            <span className="text-xl text-gray-500 font-medium">
              {" "}
              ({filteredProducts.length} Items){" "}
            </span>
          </h3>
          <InputGroup className=" md:w-[30%]">
            <InputGroupInput
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
          </InputGroup>
        </div>

        {products.length === 0 ? (
          <NoProducts text="No products available." />
        ) : filteredProducts.length === 0 ? (
          <NoProducts text="No products match your search or filter criteria." />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 ">
            {filteredProducts.map((product) => (
              <ProductsCard key={product._id} product={product} />
            ))}
          </div>
        )}
        {/* <nav
          aria-label="Page navigation example"
          className="flex justify-center mt-5"
        >
          <ul className="inline-flex -space-x-px text-sm">
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                1
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                2
              </a>
            </li>
          </ul>
        </nav> */}
      </div>
    </div>
  );
}
