import getProductById from "@/APIs/GetProductById";
import Image from "next/image";
import React, { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import AddBtnCart from "@/components/layout/AddBtnCart/AddBtnCart";
import { Star, StarHalf } from "lucide-react";
import AddBtnFav from "@/components/layout/AddBtnFav/AddBtnFav";
const StarRating = ({ rating, maxStars = 5, iconClass = "w-6 h-6" }) => {
  const roundedRating = useMemo(() => Math.round(rating * 2) / 2, [rating]);
  const stars = useMemo(() => {
    const starElements = [];
    for (let i = 1; i <= maxStars; i++) {
      const starValue = i;
      if (starValue <= roundedRating) {
        starElements.push(
          <Star
            key={i}
            className={`${iconClass} fill-yellow-500 text-yellow-500`}
          />
        );
      } else if (starValue - 0.5 === roundedRating) {
        starElements.push(
          <StarHalf
            key={i}
            className={`${iconClass} fill-yellow-500 text-yellow-500`}
          />
        );
      } else {
        starElements.push(
          <Star
            key={i}
            className={`${iconClass} fill-gray-300 text-gray-300`}
          />
        );
      }
    }
    return starElements;
  }, [roundedRating, maxStars, iconClass]);

  // Ensure the rating is between 0 and maxStars
  if (rating < 0 || rating > maxStars) {
    // You might want to return an error state or default stars here
    return <div className="text-red-500">Invalid Rating</div>;
  }

  return <div className="flex space-x-0.5 justify-center">{stars}</div>;
};
export default async function page({ params }) {
  const { id } = await params;
  const { data } = await getProductById(id);

  return (
    <section className="bg-gray-100 min-h-[90vh] p-4 flex justify-center items-center w-full">
      <div className="bg-white rounded-xl shadow-lg w-[80%] h-auto p-6 md:p-8 grid grid-cols-2 relative ">
        <AddBtnFav id={id} productdetails={true} />
        <div className="col-span-1  gap-3">
          <div className="flex flex-col justify-center gap-2 items-center rounded-2xl shrink-0">
            <Image
              className="h-[250px] max-w-full rounded-lg "
              src={data?.images[0]}
              alt="img"
              height={400}
              width={300}
            />
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full max-w-xs"
            >
              <CarouselContent>
                {data?.images.map((myimg) => (
                  <CarouselItem key={myimg} className="pt-1 gap-2 md:basis-1/3">
                    <div className="p-1">
                      <Card className="p-0">
                        <CardContent className="flex items-center aspect-square justify-center p-0">
                          <Image
                            className=" rounded-lg"
                            src={myimg}
                            alt="img"
                            height={100}
                            width={80}
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
        <div className="col-span-1 flex flex-col justify-between leading-normal py-10">
          <p className="text-lg font-semibold uppercase tracking-wider text-sky-700 mb-2">
            {data.category.name}
          </p>
          <h2 className="text-4xl  font-bold text-gray-900  mb-3 leading-tight">
            {data.title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 ">
            {data.description}
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 ">
            Brand :{" "}
            <span className="text-gray-900 font-semibold">
              {" "}
              {data.brand.name}
            </span>
          </p>
          <div className="flex items-center mt-2.5 mb-5">
            <div className="flex flex-col items-center space-y-3">
              <StarRating rating={data.ratingsAverage} iconClass="w-6 h-6" />
            </div>
            <span className="text-lg mx-2">
              {" "}
              {data.ratingsAverage} ({data.ratingsQuantity} Review)
            </span>
          </div>
          <p className="text-3xl font-bold text-gray-900 mb-4">
            {data.price.toFixed(2)} EGP
          </p>
          <AddBtnCart id={id} productdetails={true} />
        </div>
      </div>
    </section>
  );
}
