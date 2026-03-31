import getProductById from "@/APIs/GetProductById";

import React, { useMemo } from "react";
import AddBtnCart from "@/components/layout/Buttons/CartBtn";
import { Star, StarHalf } from "lucide-react";
import AddBtnFav from "@/components/layout/Buttons/FavBtn";
import ImgCarousel from "@/components/layout/Common/ImgCarousel/ImgCarousel";

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
          />,
        );
      } else if (starValue - 0.5 === roundedRating) {
        starElements.push(
          <div key={i} className="relative">
            <StarHalf
              className={`${iconClass} fill-yellow-500 text-yellow-500 absolute`}
            />
            <Star className={`${iconClass} fill-gray-300 text-gray-300`} />
          </div>,
        );
      } else {
        starElements.push(
          <Star
            key={i}
            className={`${iconClass} fill-gray-300 text-gray-300`}
          />,
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
    <section className="bg-gray-100 min-h-[90vh] py-4 flex flex-col justify-center gap-3 items-center w-full">
      <div className="bg-white rounded-xl shadow-lg  w-[90%] min-h-[85vh] p-6 md:p-8 grid grid-cols-2 gap-14 relative ">
        <AddBtnFav id={id} productdetails={true} />
        <div className="col-span-2 lg:col-span-1 gap-3">
          <ImgCarousel images={data?.images} />
        </div>
        <div className="col-span-2 lg:col-span-1 flex flex-col justify-between leading-normal  lg:py-10">
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
            <span className="text-lg mx-2 text-gray-400">
              ({data.ratingsQuantity} Review)
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
