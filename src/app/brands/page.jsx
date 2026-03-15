import React from "react";
import getAllBrands from "@/APIs/GetAllBrands";
import Image from "next/image";
import PageTitle from "@/components/layout/Common/PageTitle/PageTitle";
export default async function page() {
  const brands = await getAllBrands();
  return (
    brands && (
      <section className="bg-gray-100 min-h-[90vh] py-4 flex flex-col justify-center gap-3 items-center w-full">
        <PageTitle title={"Shop By Brands"} />
        <div className="bg-white rounded-xl shadow-lg w-[90%]  p-6 md:p-8 ">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 mb-4">
            {brands.data.map((item) => (
              <div
                key={item._id}
                className="rounded-md cursor-pointer border font-mono text-sm hover:border-sky-900"
              >
                <Image
                  className=" rounded-t-lg h-37.5 object-cover  "
                  src={item.image}
                  alt="brand image"
                  width={200}
                  height={150}
                  unoptimized
                  loading="lazy"
                />
                <h5 className="text-xl py-2 line-clamp-1 text-center font-semibold tracking-tight text-gray-900 dark:text-white">
                  {item.name}
                </h5>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  );
}
