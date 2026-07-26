import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { FaArrowRight } from "react-icons/fa";
import { AiOutlineSafety } from "react-icons/ai";
import { MdOutlineLocalShipping, MdOutlineSupportAgent } from "react-icons/md";
const whyus = [
  {
    icon: MdOutlineLocalShipping,
    title: "Free Shipping",
    description: "On all orders ",
  },
  {
    icon: AiOutlineSafety,
    title: "Secure Payments",
    description: "100% secure",
  },
  {
    icon: MdOutlineSupportAgent,
    title: "24/7 Support",
    description: "We’re here anytime",
  },
];
export default function HeroSection() {
  return (
    <main className="w-full flex flex-col-reverse lg:flex-row gap-2 justify-center overflow-hidden lg:min-h-[75vh] rounded-xl shadow-lg bg-linear-to-b from-sky-800/30 to-sky-950/50 text-white p-2 md:p-4 lg:p-0">
      <div className=" flex flex-col gap-3 md:gap-5 text-center lg:text-left justify-between items-stretch w-[90%] mx-auto lg:w-[45%] lg:mx-0 lg:py-13 ">
        <h1 className="text-5xl lg:text-6xl lg:py-2 leading-15 lg:leading-17 text-shadow-lg   font-extrabold text-sky-900">
          Everything for the way you live
        </h1>
        <h3 className="text-lg lg:text-xl lg:max-w-md ">
          From the latest fashion and timeless books to daily essentials and
          baby gear. Quality finds for every corner of your life.
        </h3>
        <Link
          href="/products"
          className={`${buttonVariants({ variant: "primary", size: "lg" })} w-1/2  h-11 self-center lg:self-start`}
        >
          Shop Now <FaArrowRight />
        </Link>
        <section className="w-full flex flex-row gap-3">
          {whyus.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={index}
                className="md:w-1/3 flex flex-col lg:flex-row text-center lg:text-start gap-2  justify-center items-center py-3  px-2 bg-linear-to-b from-sky-800/30 to-sky-950/50 rounded-xl"
              >
                <Icon className="w-10 h-10 text-white bg-sky-900 p-1 rounded-2xl shrink-0" />
                <div className="flex flex-col gap-1">
                  <h4 className="text-sm font-bold text-sky-900">
                    {card.title}
                  </h4>
                  <p className="text-white text-xs">{card.description}</p>
                </div>
              </div>
            );
          })}
        </section>
      </div>
      <div className="relative h-fit lg:w-1/2  lg:self-end ">
        <Image
          className="object-contain relative h-80 md:h-100 lg:h-full w-[85%] z-30  "
          src="/HeroImg.png"
          alt="Hero image"
          width={340}
          height={320}
          unoptimized
          loading="lazy"
        />
        <div className="size-75 md:size-100 lg:size-130 absolute top-[50%] left-[50%] -translate-1/2 z-10 rounded-full from-sky-100/50 to-sky-950/40 bg-radial-[at_50%_75%]  via-sky-700/30  to-90%"></div>
      </div>
    </main>
  );
}
