"use client";
import NoProducts from "@/components/layout/Common/NoProducts/NoProducts";
import PageTitle from "@/components/layout/Common/PageTitle/PageTitle";
import ProductsCard from "@/components/layout/Common/ProductsCard/ProductsCard";
import { favContext } from "@/Context/FavContextProvider";
import React, { useContext } from "react";

export default function page() {
  const { products, isLoading, numOfFav } = useContext(favContext);
  if (isLoading) {
    return <p>loading</p>;
  }
  return (
    <section className="bg-gray-100 min-h-[90vh] py-4 flex flex-col  gap-3 items-center w-full">
      <PageTitle title="Wishlist" />
      <div className="bg-white flex flex-col gap-4 rounded-xl shadow-lg w-[90%] p-6 md:p-8 ">
        <h3
          className="text-lg md:text-2xl
                font-bold capitalize
                text-transparent
                bg-clip-text
                bg-linear-to-b
                from-sky-800
                to-sky-900"
        >
          Shopping Favourite ({numOfFav} items)
        </h3>
        {products.length == 0 ? (
          <NoProducts text="No products available , Add some products to whishlist"/>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 mb-4">
            {products.map((product) => (
              <ProductsCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
