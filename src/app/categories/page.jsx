import React from 'react'
import Image from "next/image";
import getAllCategories from "@/APIs/GetAllcategories";
export default async function page() {
    const categories = await getAllCategories();
  return (
    categories && (
          <section className="bg-gray-100 min-h-[90vh] p-4 flex flex-col justify-center gap-3 items-center w-full">
            <div className="bg-white rounded-xl shadow-lg w-[90%]  p-6 md:p-8 ">
              <h1 className="text-5xl text-center font-extrabold text-transparent bg-clip-text bg-linear-to-b from-sky-700 to-stone-800">
                Our Categories
              </h1>
            </div>
            <div className="bg-white rounded-xl shadow-lg w-[90%]  p-6 md:p-8 ">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 mb-4">
                {categories.data.map((item) => (
                  <div
                    key={item._id}
                    className="rounded-md cursor-pointer border px-4 py-2 font-mono text-sm hover:border-sky-900"
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
                    <h5 className="text-xl line-clamp-1 text-center font-semibold tracking-tight text-gray-900 dark:text-white">
                      {item.name}
                    </h5>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )
  )
}
