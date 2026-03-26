import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import getAllCategories from "@/APIs/GetAllcategories";
import getAllProducts from "@/APIs/GetAllProducts";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import ProductsCard from "@/components/layout/Common/ProductsCard/ProductsCard";
import { MdOutlineLocalShipping, MdOutlineSupportAgent } from "react-icons/md";
import { AiOutlineSafety } from "react-icons/ai";
export default async function Home() {
  const [{ data: products }, { data: categories }] = await Promise.all([
    getAllProducts(),
    getAllCategories(),
  ]);
  return (
    <div className="min-h-[90vh] py-4  flex flex-col gap-3 items-center">
      <main className="flex gap-4 justify-around bg-white h-[70vh] rounded-xl rounded-b-[20%] shadow-lg w-[90%]  p-4 md:p-8 bg-linear-to-b from-sky-800/30 to-sky-950/50 text-white">
        <div className="flex flex-col gap-3 md:gap-5 text-center lg:text-left justify-center items-stretch md:w-[90%] lg:w-[40%] px-5 ">
          <h1 className="text-4xl md:text-5xl lg:text-6xl lg:py-2 leading-14 lg:leading-16 tracking-wider  capitalize font-extrabold text-sky-900">
            Everything for the way you live
          </h1>
          <h3 className="text-lg lg:text-xl mb-2 lg:mb-5">
            From the latest fashion and timeless books to daily essentials and
            baby gear. Quality finds for every corner of your life.
          </h3>
          <div className="flex gap-4 self-center lg:self-start">
            <Link
              href="/products"
              className="w-[200px] flex justify-center items-center-safe gap-3 p-3 bg-linear-to-b from-sky-800 to-sky-950 rounded-2xl"
            >
              Shop Now <FaArrowRight />
            </Link>
          </div>
        </div>
        <Image
          className="object-contain hidden lg:block"
          src="/HeroImg.png"
          alt="Hero image"
          width={400}
          height={216}
          unoptimized
          loading="lazy"
        ></Image>
      </main>
      <section className="flex w-[90%] flex-col md:flex-row p-6 md:p-8  gap-4">
        <div className="md:w-1/3 flex md:flex-col lg:flex-row md:text-center lg:text-start gap-5 justify-center items-center py-8 p-3 bg-linear-to-b from-sky-800/30 to-sky-950/50 rounded-3xl">
          <MdOutlineLocalShipping className="w-15 h-15 text-white bg-sky-900 p-2 rounded-2xl" />
          <div className="flex flex-col gap-2">
            <h4 className="text-xl lg:text-2xl font-bold text-sky-900">
              Fast Shipping
            </h4>
            <p className="text-white">Free delivery over 1000 EGP</p>
          </div>
        </div>
        <div className="md:w-1/3 flex md:flex-col lg:flex-row md:text-center lg:text-start gap-5 justify-center items-center py-8 p-3 bg-linear-to-b from-sky-800/30 to-sky-950/50 rounded-3xl">
          <AiOutlineSafety className="w-15 h-15 text-white bg-sky-900 p-2 rounded-2xl" />
          <div className="flex flex-col gap-2">
            <h4 className="text-xl lg:text-2xl font-bold text-sky-900">
              Secure Payments
            </h4>
            <p className="text-white">Trusted & encrypted checkout</p>
          </div>
        </div>
        <div className="md:w-1/3 flex md:flex-col lg:flex-row md:text-center lg:text-start gap-5 justify-center items-center py-8 p-3 bg-linear-to-b from-sky-800/30 to-sky-950/50 rounded-3xl">
          <MdOutlineSupportAgent className="w-15 h-15 text-white bg-sky-900 p-2 rounded-2xl" />
          <div className="flex flex-col gap-2">
            <h4 className="text-xl lg:text-2xl font-bold text-sky-900">
              24/7 Support
            </h4>
            <p className="text-white">We’re here anytime you need us</p>
          </div>
        </div>
      </section>

      <section className=" w-[90%]  p-6 md:p-8 ">
        <h3 className="text-3xl md:text-4xl lg:text-5xl py-4 mb-4 text-center leading-16 tracking-wider  capitalize font-extrabold text-sky-900">
          Categories
        </h3>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className=" w-[95%] mx-auto"
        >
          <CarouselContent>
            {categories.map((item) => (
              <CarouselItem
                key={item._id}
                className="md:basis-1/3 lg:basis-1/5"
              >
                <div className="p-1">
                  <Card className="rounded-md cursor-pointer border bg-white p-0  font-mono text-sm hover:border-sky-900">
                    <CardContent className="flex flex-col  items-center justify-center p-0">
                      <Image
                        className=" rounded-t-md w-full h-65 lg:h-55 object-cover  "
                        src={item.image}
                        alt="brand image"
                        width={200}
                        height={220}
                        unoptimized
                        loading="lazy"
                      />
                      <h5 className="text-md py-2 line-clamp-2 text-center font-semibold tracking-tight text-gray-900 dark:text-white">
                        {item.name}
                      </h5>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>
      <section className=" w-[90%]  p-6 md:p-8 ">
        <h3 className="text-3xl md:text-4xl lg:text-5xl py-4 mb-4 text-center leading-16 tracking-wider  capitalize font-extrabold text-sky-900">
          Trending Now
        </h3>
        <Carousel
          opts={{
            align: "start",
          }}
          className=" w-[95%] mx-auto"
        >
          <CarouselContent>
            {products.slice(0, 10).map((product) => (
              <CarouselItem
                key={product._id}
                className=" md:basis-1/3 lg:basis-1/5"
              >
                <div className="p-1">
                  <ProductsCard product={product} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>
    </div>
  );
}
