import AddBtnCart from "@/components/layout/Buttons/CartBtn";
import AddBtnFav from "@/components/layout/Buttons/WishlistBtn";
import ImgCarousel from "@/components/layout/Common/ImgCarousel/ImgCarousel";
import { PagePropsParams } from "@/types/common.type";
import { getProductById } from "@/APIs/product.api";
import StarRating from "@/components/layout/reviews/StarRating";
import { getProductReviews } from "@/APIs/reviews.api";
import ProductReviewsSection from "@/components/layout/reviews/ProductReviewsSection";
import { notFound } from "next/navigation";

export default async function ProductDetails({ params }:PagePropsParams) {
  const { id } = await params;
  const { data } = await getProductById(id);
  if (!data) {
    notFound();
  }
  const { data: initialReviews } = await getProductReviews(id);

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
              <StarRating rating={data.ratingsAverage} iconClass="w-6 h-6" maxStars={5} />
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
          <ProductReviewsSection id={id} initialReviews={initialReviews}/>
      </div>
    </section>
  );
}
