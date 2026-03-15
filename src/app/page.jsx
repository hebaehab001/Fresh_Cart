import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import getAllCategories from "@/APIs/GetAllcategories";
export default async function Home() {
  const categories = await getAllCategories();
  return (
    <div className="min-h-[90vh] py-4  flex flex-col gap-3 items-center">
      <main className="flex gap-4 justify-around bg-white h-[70vh] rounded-xl rounded-b-[20%] shadow-lg w-[90%]  p-4 md:p-8 bg-linear-to-b from-sky-800/30 to-sky-950/50 text-white">
        <div className="flex flex-col gap-5 justify-center items-stretch w-[40%] px-5 ">
          <h1 className="text-6xl py-2 leading-16 tracking-wider  capitalize font-extrabold text-sky-900">
            Everything for the way you live
          </h1>
          <h3 className="mb-5">
            From the latest fashion and timeless books to daily essentials and
            baby gear. Quality finds for every corner of your life.
          </h3>
          <div className="flex gap-4">
            <Link
              href="/products"
              className="w-[130px] flex justify-center items-baseline gap-3 p-3 bg-linear-to-b from-sky-800 to-sky-950 rounded-3xl"
            >
              Shop Now <FaArrowRight />
            </Link>

            <Link
              href="/products"
              className="w-[150px] flex justify-center items-baseline gap-3 p-3 bg-linear-to-b from-sky-800/40 to-sky-950/20 rounded-3xl"
            >
              Explore Categories
            </Link>
          </div>
        </div>
        <Image
          className="object-cover"
          src="/HeroImg.png"
          alt="Hero image"
          width={400}
          height={216}
          unoptimized
          loading="lazy"
        ></Image>
      </main>

      <section className=" w-[90%]  p-6 md:p-8 ">
        <h3 className="text-3xl py-2 leading-16 tracking-wider  capitalize font-extrabold text-sky-900">
          Categories
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 mb-4">
          {categories.data.map((item) => (
            <div
              key={item._id}
              className="rounded-md cursor-pointer border bg-white  font-mono text-sm hover:border-sky-900"
            >
              <Image
                className=" rounded-t-lg h-50 object-cover  "
                src={item.image}
                alt="brand image"
                width={200}
                height={150}
                unoptimized
                loading="lazy"
              />
              <h5 className="text-md py-2 line-clamp-2 text-center font-semibold tracking-tight text-gray-900 dark:text-white">
                {item.name}
              </h5>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
