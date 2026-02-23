"use client";
import ProductsCard from "@/components/layout/ProductsCard/ProductsCard";
import { favContext } from "@/Context/FavContextProvider";
import React, { useContext } from "react";

export default function page() {
  const { products, isLoading, numOfFav } = useContext(favContext);
  if (isLoading) {
    return <p>loading</p>;
  }
  if (products.length == 0) {
    return <h1>no data</h1>;
  }
  return (
    <section className="bg-gray-100 min-h-[90vh] p-4 flex justify-center w-full">
      <div className="bg-white rounded-xl shadow-lg w-[90%] flex flex-col h-full  p-6 md:p-8 mt-10">
        <div className="flex justify-between py-5">
          <h1 className="text-2xl font-bold text-gray-800 ">
            Shopping Favourite ({numOfFav}  items)
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 mb-4">
          {products.map((product) => (
            <ProductsCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
