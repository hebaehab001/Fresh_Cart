import React from "react";
import Image from "next/image";
import ProductsCard from "@/components/layout/Common/ProductsCard/ProductsCard";
import getAllProducts from "@/APIs/Product/getAllProducts";
import NoProducts from "@/components/layout/Common/NoProducts/NoProducts";
import getCategoriesById from "@/APIs/Category/getCategoryById";
export default async function page({ params }) {
  const { id } = await params;
  const [{ data: products }, { data: category }] = await Promise.all([
    getAllProducts(),
    getCategoriesById(id),
  ]);
  const filteredProducts = products.filter(
    (product) => product.category._id === id,
  );
  return (
    <section className="bg-gray-100 min-h-[90vh] py-4 flex flex-col justify-center gap-3 items-center w-full">
      <div className="bg-white rounded-xl shadow-lg  w-[90%] min-h-[85vh] p-6 md:p-8 grid grid-cols-12 gap-8 relative ">
        <div className="col-span-12 lg:col-span-3 gap-3">
          <Image
            className="border border-sky-900 rounded-2xl h-50 object-cover"
            src={category.image}
            alt={category.name}
            width={200}
            height={100}
          />
        </div>
        <div className="col-span-12 lg:col-span-8 flex flex-col  leading-normal  lg:py-10">
          <h2 className="text-5xl  font-bold text-sky-900  mb-3 leading-tight">
            {category.name}
          </h2>
          <div className="flex gap-5">
            <p className="text-lg text-gray-700 dark:text-gray-300 ">
              Slug :{" "}
              <span className="text-gray-900 font-semibold">
                {" "}
                {category.slug}
              </span>
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 ">
              Member since :{" "}
              <span className="text-gray-900 font-semibold">
                {" "}
                {category.createdAt.split("-")[0]}
              </span>
            </p>
          </div>
        </div>
        <div className="col-span-12 ">
          <h3
            className="text-2xl
                font-bold capitalize
                text-transparent
                bg-clip-text
                bg-linear-to-b
                from-sky-800
                to-sky-900"
          >
            Products From {category.name}
            <span className="text-xl text-gray-500 font-medium">
              {" "}
              ({filteredProducts.length} Items){" "}
            </span>
          </h3>
        </div>

        <div className="col-span-12 ">
          {products.length === 0 ? (
            <NoProducts text="No products available." />
          ) : filteredProducts.length === 0 ? (
            <NoProducts text={`No products in ${category.name}`} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 ">
              {filteredProducts.map((product) => (
                <ProductsCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
